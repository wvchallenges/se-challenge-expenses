package com.kenan.wave.webapp.resource;
import java.io.File;
import java.util.Iterator;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;

import com.kenan.wave.webapp.service.BusinessException;
import com.kenan.wave.webapp.service.ExpenseService;
import com.kenan.wave.webapp.service.SummaryItem;
import com.kenan.wave.webapp.service.data.ExpenseStorage;
import com.kenan.wave.webapp.service.data.MySqlStorage;


@Path("/expenses")
public class Expenses {
	Logger LOGGER = Logger.getLogger(Expenses.class);
	private static final String DEFAULT_EXPENSE_CSV_LOCATION = "/var/data/data_example.csv";

	private ExpenseStorage myStorage = new MySqlStorage();
	final private ExpenseService expenseService  = new ExpenseService(myStorage);
	
	@POST
	@Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response uploadCSV(@Context HttpServletRequest request) {
		int itemsProcessed = 0;
        String name = null;
        int code = 200;
        String msg = "Files uploaded successfully";
        if (ServletFileUpload.isMultipartContent(request)) {
            FileItemFactory factory = new DiskFileItemFactory();
            ServletFileUpload fileUpload = new ServletFileUpload(factory);
            try {
                List<FileItem> items = fileUpload.parseRequest(request);
                if (items != null) {
                    Iterator<FileItem> iter = items.iterator();
                    /*
                     * Return true if the instance represents a simple form
                     * field. Return false if it represents an uploaded file.
                     */
                    while (iter.hasNext()) {
                        FileItem item = iter.next();
                        if (item.isFormField()) {
                            String fieldName = item.getFieldName();
                            String fieldValue = item.getString();
                            LOGGER.info("Field Name: " + fieldName + ", Field Value: " + fieldValue);
                        } else {

                            String fileName = item.getName();
                            String contentType = item.getContentType();
                            long sizeInBytes = item.getSize();
                            
                            final File file = new File(DEFAULT_EXPENSE_CSV_LOCATION);
                            File dir = file.getParentFile();
                            if(!dir.exists()) {
                                dir.mkdir();
                            }
                            
                            if(!file.exists()) {
                                file.createNewFile();
                            }
                            LOGGER.info("uploading csv file "+fileName+" into " + file.getName()+ "["+contentType+" "+sizeInBytes+"]");
                            item.write(file);
                        }
                    }
                }
                expenseService.processExpenses();
                return Response.status(200).build();
            } catch (FileUploadException e) {
                code = 404;
                msg = e.getMessage();
                LOGGER.error(e.getMessage(),e);
            } catch (Exception e) {
                code = 404;
                msg = e.getMessage();
                LOGGER.error(e.getMessage(),e);
            }
        }

		return Response.status(code).entity(msg).build();
    }
	
	@GET
    @Path("/summary")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getSummary() {
		try {
			List<SummaryItem> summary = expenseService.getSummary();
			return Response.status(201).entity(summary).build();
		} catch (BusinessException e) {
			return Response.status(406).build();
		}
		
    }
}

