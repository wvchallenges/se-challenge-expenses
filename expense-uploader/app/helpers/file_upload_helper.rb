module FileUploadHelper

  public

    # Reads an uploaded file and returns its contents as
    # an array of lines.
    #
    # fileUploadObj: the data for the uploaded files (should have 'read' method)
    #
    # returns: an array of strings that represent
    #   the file contents as lines.
    def self.readUploadAsLines(fileUploadObj)
      #todo: check if obj has method
      fileAsString = fileUploadObj.read

      lines = fileAsString.lines.map {|x| x.chomp}

      return lines
    end

end
