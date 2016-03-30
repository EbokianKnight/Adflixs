class CreateAds < ActiveRecord::Migration
  def change
    create_table :ads do |t|
			t.string :product, null:false
			t.string :company, null:false
			t.text :description, null:false
			t.integer :year, null:false
      t.timestamps null: false
    end
		add_index :ads, :company
		add_index :ads, :product
  end
end
