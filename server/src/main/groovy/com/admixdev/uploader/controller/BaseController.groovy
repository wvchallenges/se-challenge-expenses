package com.admixdev.uploader.controller

import com.admixdev.uploader.repository.EmployeeRepository
import org.springframework.beans.factory.annotation.Autowired

/**
 * Created by alexander on 2017-02-12.
 */
class BaseController {
    @Autowired EmployeeRepository employeeRepository
}
