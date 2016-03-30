class CreateAdGenres < ActiveRecord::Migration
  def change
    create_table :ad_genres do |t|
			t.integer :ad_id, null:false
			t.integer :genre_id, null:false
      t.timestamps null: false
    end
		add_index :ad_genres, :ad_id
		add_index :ad_genres, :genre_id
  end
end
