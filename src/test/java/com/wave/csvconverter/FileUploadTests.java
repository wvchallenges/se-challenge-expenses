package com.wave.csvconverter;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.multipart.MultipartFile;

import com.wave.csvconverter.service.persistence.ConversionJobService;
import com.wave.csvconverter.service.upload.UploadService;

import java.nio.file.Path;
import java.nio.file.Paths;

import static org.mockito.BDDMockito.then;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doReturn;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.fileUpload;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@SpringBootTest
public class FileUploadTests {

	@Autowired
	private MockMvc mvc;

	@MockBean
	private UploadService uploadService;

	@MockBean
	private ConversionJobService convertionService;

	@Test
	public void shouldSaveUploadedFile() throws Exception {
		MockMultipartFile multipartFile = new MockMultipartFile("file", "test.txt", "text/plain",
				"Spring Framework".getBytes());
		doNothing().when(this.convertionService).launchConversionJob(any(Path.class));
		doReturn(Paths.get("test.txt")).when(this.uploadService).store(any(MultipartFile.class));
		this.mvc.perform(fileUpload("/").file(multipartFile)).andExpect(status().isFound())
				.andExpect(header().string("Location", "/wait-tables/test.txt"));

		then(this.uploadService).should().store(multipartFile);
	}
}
