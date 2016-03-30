class Ad < ActiveRecord::Base
	validates :company, :product, :description, :year, presence: true
	has_many :ad_genres
	has_many :genres, through: :ad_genres, source: :genre
end
