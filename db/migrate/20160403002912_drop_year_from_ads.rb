class DropYearFromAds < ActiveRecord::Migration
  def change
    remove_column :ads, :year
  end
end
