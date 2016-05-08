class CalculateAverageRating < ActiveRecord::Migration
  def change
    Ad.all.each do |ad|
      if (ad.views.average(:rate))
        average = ad.views.average(:rate).round
      else
        average = 0
      end
      ad.update_attributes(average_rate: average)
    end
  end
end
