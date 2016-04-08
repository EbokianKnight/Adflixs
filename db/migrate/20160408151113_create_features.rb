class CreateFeatures < ActiveRecord::Migration
  def change
    create_table :features do |t|
      t.integer :ad_id, null: false
      t.timestamps null: false
    end
      add_index :features, :ad_id, unique: true
  end
end
