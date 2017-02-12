package com.admixdev.uploader.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

/**
 * Created by alexander on 2017-02-12.
 */
@Component
class Config {
    // Amazon Configs
    @Value('${aws.accessKey}') String awsAccessKey
    @Value('${aws.secretKey}') String awsSecretKey
    @Value('${aws.bucket}') String awsBucket
    @Value('${aws.used}') Boolean awsUsed

    // PostgreSQL Configs
    @Value('${database.host}') String databaseHost
    @Value('${database.port}') int databasePort
    @Value('${database.name}') String databaseName
    @Value('${database.schema}') String databaseSchema
    @Value('${database.user}') String databaseUser
    @Value('${database.pass}') String databasePass
    @Value('${database.poolSize}') int databasePoolSize
    @Value('${database.poolMinIdle}') int databasePoolMinIdle

}
