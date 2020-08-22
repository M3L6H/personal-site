# Configure recaptcha
Recaptcha.configure do |config|
  if Rails.env == "development" 
    config.site_key = Rails.application.credentials.captcha_dev[:site_key]
    config.secret_key = Rails.application.credentials.captcha_dev[:secret_key]
  else
    config.site_key = Rails.application.credentials.captcha_prod[:site_key]
    config.secret_key = Rails.application.credentials.captcha_prod[:secret_key]
  end
end
