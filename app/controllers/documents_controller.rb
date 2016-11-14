class DocumentsController < ApplicationController
	skip_before_action :verify_authenticity_token

	def create
		respond_to do |format|
			if params[:file].present?
				document = Document.new
				document.file = params[:file] # Assign uploaded file
				document.save!
				# document.process_async

				format.html {redirect_to root_url}
	      format.js
			else
				# Display error
				format.html {redirect_to root_url}
	      format.js {render nothing: true}
			end
		end
	end

end