class Contact < MailForm::Base
  attribute :name, validate: true
  attribute :email, validate: URI::MailTo::EMAIL_REGEXP
  attribute :message

  def headers
    {
      subject: "Contact from Personal Site",
      to: "admin@michaelhollingworth.io",
      from: %("#{ name }" <#{ Rails.application.credentials.mailer[:username] }>)
    }
  end
end
