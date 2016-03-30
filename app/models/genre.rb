class Genre < ActiveRecord::Base
	validates :name, uniqueness: true
	has_many :ad_genres
end
