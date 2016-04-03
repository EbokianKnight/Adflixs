class AddYearAsDateToAds < ActiveRecord::Migration
  def change
    add_column :ads, :year, :date, null:false
  end
end
