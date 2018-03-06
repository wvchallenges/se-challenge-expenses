package com.wavech.expense.controller;

import com.wavech.expense.exception.ExpenseReportException;
import com.wavech.expense.handlers.FileType;
import com.wavech.expense.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;

@Controller
public class FileUploadController {

    FileService fileService;

    @Autowired
    public void setFileService(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/upload")
    public String handleFileUpload(@RequestParam("file") MultipartFile file,
                                   RedirectAttributes redirectAttributes) throws ExpenseReportException {

        try {
            String fileExt = "";
            if (file.getOriginalFilename() != null && !(fileExt = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."))).isEmpty() )
            fileService.saveExpenseFile(file.getInputStream(), FileType.getType(fileExt));

        redirectAttributes.addFlashAttribute("message",
                "You successfully uploaded " + file.getOriginalFilename() + "!");
            redirectAttributes.addAttribute("report", true);
        }
        catch (ExpenseReportException e) {
            throw e;
        } catch (IOException e) {
            throw new ExpenseReportException("Unable to get the file stream.", e);
        }
        return "redirect:/report";
    }
}
