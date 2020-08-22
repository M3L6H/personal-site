class Api::ContactController < ApplicationController
  def create
    @contact = Contact.new(contact_params)

    if verify_recaptcha(model: @contact) && @contact.deliver
      render json: { message: "Email sent successfully" }
    else
      render json: convert_errors(@contact.errors), status: 422
    end
  end

private
  def contact_params
    params.require(:contact).permit(:name, :email, :message, :captcha)
  end
end
