class CreateViews < ActiveRecord::Migration
  def change
    create_table :views do |t|
      t.integer :rate, null:false, default: 0
      t.integer :user_id, null:false
      t.integer :ad_id, null:false
      t.string :title
      t.text :review
      t.timestamps null: false
    end
    add_index :views, :user_id
    add_index :views, :ad_id
    add_index :views, :rate
  end
end
