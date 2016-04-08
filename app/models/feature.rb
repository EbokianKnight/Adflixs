class Feature < ActiveRecord::Base
  validates :ad_id, presence: true

  belongs_to :ad
end
