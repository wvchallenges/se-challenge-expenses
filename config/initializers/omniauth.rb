Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, '61426764686-kfsu8ohhoh0et9d5jphas8nnljkq5k7p.apps.googleusercontent.com', '8sZ0kVS9AtZD4aL4gQyD28i7', 
    {
    :name => "google",
    :scope => "userinfo.profile",
    :prompt => "select_account",
    :image_aspect_ratio => "square",
    :image_size => 50
  }
end
