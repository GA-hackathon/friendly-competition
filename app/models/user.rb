  class User < ApplicationRecord
    has_secure_password
  
    validates :first_name, presence: true, uniqueness: false
    validates :email, presence: true, uniqueness: true
    validates :zip_code, presence: true, uniqueness: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password, length: { minimum: 6 }
  end

