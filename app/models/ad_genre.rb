class AdGenre < ActiveRecord::Base
	validates :ad_id, :genre_id, presence: true
	belongs_to :ads
	belongs_to :genres
end
