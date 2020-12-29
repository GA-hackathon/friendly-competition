class Submission < ApplicationRecord
  scope :newest_first, -> { order(created_at: :desc) }

  belongs_to :user
  belongs_to :contest
  has_many :votes, dependent: :destroy
end
