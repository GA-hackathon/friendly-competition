class RemoveZipCodeFromUsers < ActiveRecord::Migration[6.0]
  def change
  remove_column :users, :zip_code
  end
end
