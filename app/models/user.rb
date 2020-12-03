class User < ApplicationRecord
  belongs_to :hospital   
  has_secure_password  
  #validates :email, presence: true, uniqueness: true, length: { maximum: 70 }
  #validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :username, presence: true, uniqueness: true,  length: { maximum: 100 }
  validates :password, length: { minimum: 1 },  if: -> { new_record? || !password.nil? }
end
