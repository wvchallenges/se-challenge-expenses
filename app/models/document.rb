class Document  < ActiveRecord::Base
	mount_uploader :file, CSVUploader

	# before_save :check_document_processing

	# def check_document_processing
 #    self.document_processing = true if new_record?
 #  end

 #  def process_async
 #    if document_processing
 #    	CSVImportWorker.perform_in(1.second, self.id)
 #    end
 #  end

  after_create_commit { CSVImportJob.perform_later(self) }

end