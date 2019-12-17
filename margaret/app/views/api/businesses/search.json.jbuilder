json.array! @businesses do |business|
  json.id business.id
  json.name business.name
  json.address business.address
  json.score business.score
  json.link_to_business business_business_path(business.id)
end