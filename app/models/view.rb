class View < ActiveRecord::Base
  validates :user_id, :ad_id, presence: true
  validates_uniqueness_of :user_id, scope: :ad_id

  belongs_to :user
  belongs_to :ad

  def update_average_rating(value)
    return unless (1..5).cover? value
    total_ratings = self.ad.views.pluck(:rate).push(value)
    average = (total_ratings.inject(:+) / total_ratings.length.to_f).round
    self.ad.update_attributes(average_rate: average)
  end

end
