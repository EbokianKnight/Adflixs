class Ad < ActiveRecord::Base
	validates :company, :product, :description, :year, presence: true
	has_many :ad_genres
end
