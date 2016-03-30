class AdGenre < ActiveRecord::Base
	validates :ad_id, :genre_id, presence: true
	belongs_to :ad
	belongs_to :genre
end
