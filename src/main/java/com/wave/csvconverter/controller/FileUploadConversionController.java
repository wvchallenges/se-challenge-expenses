package com.wave.csvconverter.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.wave.csvconverter.domain.MonthlyExpense;
import com.wave.csvconverter.exception.CSVConversionException;
import com.wave.csvconverter.service.persistence.BinaryJobCompletionMonitoringService;
import com.wave.csvconverter.service.persistence.ConversionJobService;
import com.wave.csvconverter.service.persistence.EmployeeExpenseDataROService;
import com.wave.csvconverter.service.upload.UploadService;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.util.List;

/*
 * Web controller class - handles and processes HTTP requests using
 * the underlying services
 */
@Controller
public class FileUploadConversionController {

	private final UploadService uploadService;
	private final ConversionJobService conversionService;
	private final EmployeeExpenseDataROService employeeExpenseDataService;
	private final BinaryJobCompletionMonitoringService jobCompletionMonitoringService;

	private static final Logger log = LoggerFactory.getLogger(FileUploadConversionController.class);

	@Autowired
	public FileUploadConversionController(UploadService storageService, ConversionJobService conversionService,
			EmployeeExpenseDataROService employeeExpenseDataService,
			BinaryJobCompletionMonitoringService jobCompletionMonitoringService) {
		this.uploadService = storageService;
		this.conversionService = conversionService;
		this.employeeExpenseDataService = employeeExpenseDataService;
		this.jobCompletionMonitoringService = jobCompletionMonitoringService;
	}

	/*
	 * Initial view showing the upload form
	 */
	@GetMapping("/")
	public String listUploadedFiles(Model model) throws IOException {

		return "uploadForm";
	}

	/*
	 * Upload CSV file request handler. Once the file is uploaded the client
	 * is redirected to the waiting page which polls for the conversion completion
	 * notification
	 */
	@PostMapping("/")
	public String handleFileUpload(@RequestParam("file") MultipartFile file) {

		Path randomFileLocation = uploadService.store(file);
		conversionService.launchConversionJob(randomFileLocation);

		return "redirect:/wait-tables/" + randomFileLocation.toString();
	}

	/*
	 * CSV File conversion processing waiting handler.
	 * Simplistic completion waiting pattern using polling for the completion status.
	 * We prevent browser from timing out while asynchronous conversion job is running.
	 * Client is redirected back to the waiting pattern as long as the file conversion is running.
	 * Client is redirected to the table with the desired data upon conversion completion.
	 * The handler accepts unique conversion file identification to distinguish between parallel
	 * conversion requests using path variables. Clients are redirected here after
	 * successful file upload request completion.
	 */
	@GetMapping("/wait-tables/{rootdirname:.+}/{randdirname:.+}/{filename:.+}")
	public String waitRenderRDBMSData(@PathVariable String rootdirname, @PathVariable String randdirname,
			@PathVariable String filename) {

		Path filePath = FileSystems.getDefault().getPath(rootdirname, randdirname).resolve(filename);
		if (jobCompletionMonitoringService.isJobCompleted(filePath.toString())) {
			return "redirect:/tables/" + filePath.toString();
		} else {
			try {
				Thread.sleep(2000);
			} catch (InterruptedException e) {
				log.error("Unable to throttle job status polling: " + e.getMessage());
			}
			return "redirect:/wait-tables/" + filePath.toString();
		}
	}

	/*
	 * Handler for the request to show rendered data for the unique CVS file
	 * which identification is passed as a path variable. Clients are redirected here after
	 * the waiting handler detects that the conversion Job is completed.
	 */
	@GetMapping("/tables/{rootdirname:.+}/{randdirname:.+}/{filename:.+}")
	public String renderRDBMSData(@PathVariable String rootdirname, @PathVariable String randdirname,
			@PathVariable String filename, Model model) {

		List<MonthlyExpense> monthlyExpenses = employeeExpenseDataService.getTotalMonthlyExpenses();

		model.addAttribute("expenses", monthlyExpenses);
		return "expenses";
	}

	/*
	 * Simple controler's exception handler. Returns 500 HTTP code.
	 */
	@SuppressWarnings("rawtypes")
	@ExceptionHandler(CSVConversionException.class)
	public ResponseEntity handleAllException(Exception ex) {

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	}
}
