package com.admixdev.uploader.controller

import groovy.util.logging.Slf4j
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile

import static org.springframework.web.bind.annotation.RequestMethod.*
import static org.springframework.http.MediaType.*

/**
 * Created by alexander on 2017-02-12.
 */
@Slf4j
@RestController
class EmployeeController extends BaseController {

    @RequestMapping(value = "/employee/upload", method = POST)
    def uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            employeeRepository.processEmployeeFile(file)
            return null
        } catch(any) {
            throw any
        }
    }

    @RequestMapping(value = "/employee/job", method = GET)
    def getJobs() {
        try {
            log.debug("getting all jobs");
            return employeeRepository.getJobs()
        } catch (any) {
            throw any
        }
    }

    @RequestMapping(value = "/employee/job/{job}", method = GET, produces = APPLICATION_JSON_VALUE)
    def getDetails(@PathVariable("job") String job) {
        try {
            log.debug("getting sum per month details for job: ${job}")
            return employeeRepository.getJob(job)
        } catch(any) {
            throw any
        }

    }
}
