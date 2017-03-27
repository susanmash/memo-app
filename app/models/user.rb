class User < ActiveRecord::Base
  has_secure_password
  EMAIL_REGEX = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]+)\z/i
  validates :firstname, :lastname, :password, :presence => true
  validates :email, :presence => true, :format => { :with => EMAIL_REGEX }, :uniqueness => { :case_sensitive => false }
  has_many :memos
end
