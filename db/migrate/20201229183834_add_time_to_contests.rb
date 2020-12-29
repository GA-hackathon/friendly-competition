class AddTimeToContests < ActiveRecord::Migration[6.0]
  def change
    add_column :contests, :ending_time, :datetime 
  end
end
