class Ad < ActiveRecord::Base
	has_attached_file :image, styles: { large: "1300x500^", thumb: "300x200>" }, default_url: "/images/:style/demo.jpg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

	validates :company, :product, :description, :year, :title, presence: true
	has_many :ad_genres
	has_many :genres, through: :ad_genres, source: :genre
	has_many :views
	has_many :viewed, through: :views, source: :user
	has_many :favorites
	has_many :features
end
