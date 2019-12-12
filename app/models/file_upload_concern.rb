module FileUploadConcern
  extend ActiveSupport::Concern

  class_methods do
    def upload form_field, attribute
      define_method "#{form_field}=" do |file|
        FileUploader.create.save(file) do |uploaded_file|
          send("#{attribute}=", uploaded_file)
        end
      end
    end
  end
end
