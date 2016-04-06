class CreateFavorites < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
      t.integer :ad_id
      t.timestamps null:false
    end
    add_index :favorites, :ad_id, unique: true
  end
end
