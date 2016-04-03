class AdGenre < ActiveRecord::Base
	validates_associated :ad, :genre
	belongs_to :ad
	belongs_to :genre
end
