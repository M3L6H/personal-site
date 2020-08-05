# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  admin           :boolean          default(FALSE), not null
#  bio             :text             default("")
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  username        :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email          (email) UNIQUE
#  index_users_on_session_token  (session_token) UNIQUE
#  index_users_on_username       (username) UNIQUE
#
class User < ApplicationRecord
  validates :email, :password_digest, :session_token, :username, presence: true
  validates :email, :session_token, :username, uniqueness: true

  validates :username, length: { in: 5..32 }
  
  validates :admin, inclusion: { in: [true, false] }

  validates :password, length: { minimum: 6, allow_nil: true }

  validate :username_cannot_contain_restricted_chars,
    :email_should_be_in_valid_format

  attr_reader :password

  after_initialize :ensure_session_token

  # Auth
  class << self
    def generate_session_token
      SecureRandom::urlsafe_base64(32)
    end

    def find_by_credentials(username, password) 
      # Support signing in with username or email
      user = self.find_by(username: username) || self.find_by(email: username)

      # Return user only if the password is correct
      user if user.is_password?(password) 
    end
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.update!(session_token: User.generate_session_token)
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  # Methods
  def is_admin?
    self.admin
  end

  # Custom validators
  def username_cannot_contain_restricted_chars
    if /[^\w_]/ === self.username
      errors[:username] << "cannot contain restricted characters"
    end
  end

  def email_should_be_in_valid_format
    unless URI::MailTo::EMAIL_REGEXP === self.email
      errors[:email] << "should be in a valid format"
    end
  end
end
