class RenameLikesToVotes < ActiveRecord::Migration[6.0]
  def change
  rename_table :likes, :votes
  end
end
