class Services::BaseService
  include ActiveModel::Model

  def copy_errors_from(source)
    source.errors.each {|field, msg| errors.add(field, msg)}
  end
end