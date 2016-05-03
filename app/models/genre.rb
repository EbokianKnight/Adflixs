class Genre < ActiveRecord::Base
	validates :name, uniqueness: true
	has_many :ad_genres
	has_many :ads, through: :ad_genres, source: :ad
	has_many :views, through: :ads, source: :views
	paginates_per 3

	def self.personalized_genres(user_id)
		Genre
			.select("genres.*")
			.group(:id)
			.joins(:views)
			.where("views.user_id = #{user_id}")
			.order("SUM(views.rate) DESC")
	end
end
