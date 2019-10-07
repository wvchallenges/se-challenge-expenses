package com.wave.csvconverter;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

import com.wave.csvconverter.service.persistence.ConversionJobService;
import com.wave.csvconverter.service.upload.UploadService;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;
import static org.mockito.BDDMockito.then;
import static org.mockito.Matchers.any;

import java.nio.file.Path;
import java.nio.file.Paths;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class FileUploadIntegrationTests {

	@Autowired
	private TestRestTemplate restTemplate;

	@MockBean
	private UploadService uploadService;

	@MockBean
	private ConversionJobService conversionService;

	@LocalServerPort
	private int port;

	@Test
	public void shouldUploadFile() throws Exception {
		ClassPathResource resource = new ClassPathResource("testupload.txt", getClass());
		doNothing().when(this.conversionService).launchConversionJob(any(Path.class));
		doReturn(Paths.get("testupload.txt")).when(this.uploadService).store(any(MultipartFile.class));
		
		MultiValueMap<String, Object> map = new LinkedMultiValueMap<String, Object>();
		map.add("file", resource);
		ResponseEntity<String> response = this.restTemplate.postForEntity("/", map, String.class);

		assertThat(response.getStatusCode()).isEqualByComparingTo(HttpStatus.FOUND);
		assertThat(response.getHeaders().getLocation().toString()).startsWith("http://localhost:" + this.port + "/");
		then(uploadService).should().store(any(MultipartFile.class));
	}
}
