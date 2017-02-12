package com.admixdev.uploader.repository

import groovy.util.logging.Slf4j
import org.postgresql.copy.CopyManager
import org.postgresql.core.BaseConnection
import org.springframework.dao.DataAccessException
import org.springframework.jdbc.core.ConnectionCallback
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile

import java.sql.Connection
import java.sql.SQLException
import java.sql.Timestamp

/**
 * Created by alexander on 2017-02-12.
 */
@Transactional
@Repository
@Slf4j
class EmployeeRepository extends BaseRepository {

    def processEmployeeFile(MultipartFile file) throws Exception {
        pgJdbcTemplate.execute(new ConnectionCallback() {
            @Override
            Object doInConnection(Connection con) throws SQLException, DataAccessException {
                try {
                    con.autoCommit = false
                    def date = new Date().time
                    def employeeTmpTable = "employee_tmp_${date}"
                    String timestamp = new Timestamp(date) as String

                    def jobId = UUID.randomUUID()
                    String filePath = "/jobs/${jobId}/"
                    // create job
                    def insStmt = con.prepareStatement("""
                        INSERT INTO job(id, timestamp, file_path, file_name)
                        VALUES(?,'${timestamp}',?,?);
                    """)
                    insStmt.setObject(1, jobId)
                    insStmt.setString(2, filePath)
                    insStmt.setString(3, file.originalFilename)
                    insStmt.executeUpdate()

                    // load data
                    // create temp table
                    con.createStatement().execute("""
                        CREATE TEMP TABLE ${employeeTmpTable} (date varchar(15),category varchar(30),employee_name varchar(50),employee_address varchar(100),expense_description varchar(200),pre_tax_amnt varchar(20),tax_name varchar(30),tax_amnt varchar(20));
                    """)

                    // copy data to temp table
                    File tmpFile = new File(System.getProperty("java.io.tmpdir")
                            + System.getProperty("file.separator")
                            + file.getOriginalFilename())
                    file.transferTo(tmpFile)

                    CopyManager cm = new CopyManager(con.unwrap(BaseConnection));
                    cm.copyIn("""COPY ${employeeTmpTable} (date,category,employee_name,employee_address,expense_description,pre_tax_amnt,tax_name,tax_amnt) FROM STDIN CSV header delimiter ',';""", new FileInputStream(tmpFile))

                    // insert data into live table
                    def numberOfUpdated = con.createStatement().executeUpdate("""
                        INSERT INTO employee_data (job_id,date,category,employee_name,employee_address,expense_description,pre_tax_amnt,tax_name,tax_amnt)
                        SELECT
                            '${jobId}',
                            to_date(e.date, 'MM/DD/YYYY'),
                            e.category,
                            e.employee_name,
                            e.employee_address,
                            e.expense_description,
                            replace(trim(e.pre_tax_amnt),',','')::numeric,
                            e.tax_name,
                            replace(trim(e.tax_amnt),',','')::numeric
                            FROM ${employeeTmpTable} e;
                    """)

                    // upload file (only if AWS is configured)

                    s3Service.uploadFile(filePath,file.originalFilename,tmpFile,null)
                    log.debug("updated: ${numberOfUpdated}")

                    // drop tmp table
                    con.createStatement().execute("""
                        DROP TABLE IF EXISTS ${employeeTmpTable};
                    """)
                    con.commit()
                } catch (any) {
                    con.rollback()
                    throw any
                }
            }
        })
    }

    // retrieves all jobs
    def getJobs() throws Exception {
        def jobs = []
        def resultSet = pgJdbcTemplate.queryForList("""
            SELECT to_json(job)
            FROM (
                SELECT
                    j.id "jobId",
                    j.timestamp "timestamp",
                    j.file_path "filePath",
                    j.file_name "fileName"
                FROM job j order by j.timestamp desc
            ) job;
        """)
        resultSet.each {
            jobs.add(jsonSlurper.parseText(it.to_json.value))
        }
        return jobs
    }

    // retrieves monthly total expenses by id
    def getJob(def job) throws Exception {
        def details = []
        def resultSet = pgJdbcTemplate.queryForList("""
            SELECT to_json(details)
            FROM (
                SELECT
                    to_char(e.date,'Mon') as month,
                    sum(e.pre_tax_amnt)+sum(e.tax_amnt) as total
                    from employee_data e where job_id = '${job}' group by month
            ) details;
        """)
        resultSet.each {
            details.add(jsonSlurper.parseText(it.to_json.value))
        }
        return details
    }

}
