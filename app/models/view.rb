class View < ActiveRecord::Base
  validates :user_id, :ad_id, presence: true
  validates_uniqueness_of :user_id, scope: :ad_id

  belongs_to :user
  belongs_to :ad
end
