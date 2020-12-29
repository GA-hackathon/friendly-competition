class AddForeignKeyToSubmissions < ActiveRecord::Migration[6.0]
  def change
     add_foreign_key :submissions, :contests
  end
end
