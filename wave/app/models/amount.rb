class Amount < ActiveRecord::Base
  mount_uploader :csv, CsvUploader
end
