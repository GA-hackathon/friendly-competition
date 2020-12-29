class AddPictureToContests < ActiveRecord::Migration[6.0]
  def change
    add_column :contests, :picture, :string 
  end
end
