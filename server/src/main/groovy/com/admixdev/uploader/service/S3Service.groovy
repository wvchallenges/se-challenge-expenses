package com.admixdev.uploader.service

import com.admixdev.uploader.config.Config
import com.amazonaws.AmazonClientException
import com.amazonaws.services.s3.AmazonS3Client
import com.amazonaws.services.s3.model.ObjectMetadata
import com.amazonaws.services.s3.transfer.TransferManager
import com.amazonaws.services.s3.transfer.Upload
import groovy.util.logging.Slf4j
import org.apache.http.ConnectionClosedException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component
import org.springframework.web.multipart.MultipartFile

/**
 * Created by alexander on 2017-02-12.
 */
@Slf4j
@Component
class S3Service {
    @Autowired Config config
    @Autowired AmazonS3Client s3Client

    def uploadOneFile(String path, MultipartFile file) {
        if (!config.awsUsed) {
            log.info("S3 is not used, file wasn't uplaoded")
            return null
        }
        if(!file.isEmpty()) {
            try {
                log.debug("Uploading file to: " + path)
                String fileName = file.originalFilename
                File tmpFile = new File(System.getProperty("java.io.tmpdir") + System.getProperty("file.separator") + file.originalFilename)
                file.transferTo(tmpFile)
                uploadFile(path, fileName, tmpFile, null)
            } catch (any) {
                log.error("Error in the fileOne upload: ", any)
            }
        } else {
            log.error("You failed to upload, because the file was empty")
            String message = "You failed to upload, because the file was empty."
            return new ResponseEntity<>(message, HttpStatus.NO_CONTENT)
        }
    }

    public void uploadFile(String filePathPrefix, String fileName, File file, String bucket) throws Exception {
        if (!config.awsUsed) {
            log.info("S3 is not used, file wasn't uplaoded")
            return
        }
        bucket = bucket ? bucket : config.awsBucket
        TransferManager transferManager = new TransferManager(s3Client)
        InputStream targetStream = new FileInputStream(file)

        ObjectMetadata metaData = new ObjectMetadata()
        metaData.contentLength = file.length()

        String filePathToUpload = filePathPrefix.replaceAll('^/|/$', "") + "/" + fileName

        boolean isComplete = false
        while (!isComplete) {
            try {
                log.debug("Starting upload of file {} to S3", fileName)
                Upload upload = transferManager.upload(bucket, filePathToUpload, targetStream, metaData)
                upload.waitForCompletion()
                isComplete = true
            } catch (AmazonClientException | InterruptedException e) {
                if (e.cause instanceof SocketException || e.cause instanceof ConnectionClosedException)
                    log.error("An error occured while uploading file {} to s3 - retrying...", fileName)
                else
                    throw e
            }
        }
    }
}
