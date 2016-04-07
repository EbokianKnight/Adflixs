# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Genre.destroy_all
Ad.destroy_all
AdGenre.destroy_all
User.destroy_all

User.create!(email: "Guest", password: "password", admin: false)
User.create!(email: "MyTest", password: "testtest", admin: true)

youtube = [
  '0oYlOBun8UI', 'OlZqBR3yTiw', 'S2nBBMbjS8w', 'zV7N21LSr_Y', 'RZd2NDzQzA4',
  'M0D3jKLz6sA', '40DykbPa4Lc', 'k3NrLgfp_4w', 'oIfNv9qLvy4', 'WMI3nDccXtc',
  'LT6n1HcJOio'
]

genres = [
  Genre.create!(name: "funny"),
  Genre.create!(name: "cars"),
  Genre.create!(name: "previews"),
  Genre.create!(name: "foods"),
  Genre.create!(name: "drinks"),
  Genre.create!(name: "clothing"),
  Genre.create!(name: "arty"),
  Genre.create!(name: "animals"),
  Genre.create!(name: "politics"),
  Genre.create!(name: "tech")
]

ads = []

150.times do |i|
  g_ids = genres.sample(rand(3)+1).map{ |g| g.id }
  ads.push(Ad.create!(
    title: Faker::Superhero.power,
    company: Faker::Company.name,
    product: Faker::Superhero.name,
    description: Faker::Lorem.paragraph,
    year: Faker::Date.between(1.year.ago, Date.today),
    genre_ids: g_ids,
    youtube: youtube.sample(1),
    image: File.open("app/assets/images/random_ads/" + rand(30).next.to_s + ".jpg")
  ))
end

20.times do |user|
  t = User.create!(email: Faker::Internet.free_email, password: "lolcats" )
  ads.sample(60).each do |ad|
    t.views.create!(
      ad_id: ad.id,
      rate: rand(5) + 1,
      title: Faker::Hipster.word,
      review: Faker::Hipster.paragraph(2)
      )
  end
end
