class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.references :contest, null: false, foreign_key: true
      t.text :content
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
