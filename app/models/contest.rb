class Contest < ApplicationRecord 
  belongs_to :user
  has_many :submissions

end
