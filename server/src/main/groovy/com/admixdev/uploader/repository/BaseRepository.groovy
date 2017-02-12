package com.admixdev.uploader.repository

import com.admixdev.uploader.service.S3Service
import groovy.json.JsonSlurper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate

/**
 * Created by alexander on 2017-02-12.
 */

class BaseRepository {
    @Autowired JdbcTemplate pgJdbcTemplate
    @Autowired S3Service s3Service
    @Autowired JsonSlurper jsonSlurper
}
