class AddColumnAverageRatingToAdsTableAgain < ActiveRecord::Migration
  def change
    add_column :ads, :average_rate, :int, default: 0
  end
end
