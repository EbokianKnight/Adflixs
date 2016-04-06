class Genre < ActiveRecord::Base
	validates :name, uniqueness: true
	has_many :ad_genres
	has_many :ads, through: :ad_genres, source: :ad
	paginates_per 3
end
