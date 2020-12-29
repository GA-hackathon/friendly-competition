class CreateSubmissions < ActiveRecord::Migration[6.0]
  def change
    create_table :submissions do |t|
      t.string :content
      t.string :name
      t.string :file
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
