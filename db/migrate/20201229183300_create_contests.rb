class CreateContests < ActiveRecord::Migration[6.0]
  def change
    create_table :contests do |t|
      t.string :category
      t.string :name
      t.text :rules
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
