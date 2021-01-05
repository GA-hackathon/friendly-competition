  class User < ApplicationRecord
    has_secure_password
  
    has_many :votes, dependent: :destroy
    has_many :submissions, dependent: :destroy
    has_many :contests, dependent: :destroy
    has_many :comments, dependent: :destroy

    validates :first_name, presence: true, uniqueness: false
    validates :email, presence: true, uniqueness: true

    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }


    validates :password, length: { minimum: 8, maximum: 20 }
    # PASSWORD_REGEXP = 
    # validates :password, format: {with: PASSWORD_REGEXP}

    # saves email field to lowercase once registering so when logging in it's case insensitive for the email
    before_save { email.downcase! }

  end

