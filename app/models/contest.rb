class Contest < ApplicationRecord 
  scope :newest_first, -> { order(created_at: :desc) }
  
  belongs_to :user
  has_many :submissions, dependent: :destroy
  has_many :comments, dependent: :destroy

end
