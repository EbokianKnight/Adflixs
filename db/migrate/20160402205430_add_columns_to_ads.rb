class AddColumnsToAds < ActiveRecord::Migration
  def change
    add_column :ads, :title, :string
    add_column :ads, :youtube, :string
  end
end
