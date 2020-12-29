  class User < ApplicationRecord
    has_secure_password
  
    validates :first_name, presence: true, uniqueness: false
    validates :email, presence: true, uniqueness: true
    # validates :last_name, presence: true, uniqueness: false
    # validates :image, presence: true, uniqueness: false

    validates :zip_code, presence: true, uniqueness: false
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password, length: { minimum: 6 }

    # saves email field to lowercase once registering so when logging in it's case insensitive for the email
    before_save { email.downcase! }

  end

