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
View.destroy_all
Favorite.destroy_all
Feature.destroy_all

User.create!(email: "Guest", password: "password", admin: false)
User.create!(email: "MyTest", password: "testtest", admin: true)

youtube = [
  '0oYlOBun8UI', 'OlZqBR3yTiw', 'S2nBBMbjS8w', 'zV7N21LSr_Y', 'RZd2NDzQzA4',
  'M0D3jKLz6sA', '40DykbPa4Lc', 'FoGGDKV88Fg', 'WMI3nDccXtc', 'LT6n1HcJOio'
]

genres = [
  Genre.create!(name: "drinks"), #0
  Genre.create!(name: "cars"), #1
  Genre.create!(name: "funny"), #2
  Genre.create!(name: "foods"), #3
  Genre.create!(name: "previews"), #4
  Genre.create!(name: "clothing"), #5
  Genre.create!(name: "arty"), #6
  Genre.create!(name: "animals"), #7
  Genre.create!(name: "politics"), #8
  Genre.create!(name: "tech") #9
]

bro = Ad.create!(
  title: "Brotherly Love",
  company: "Coca-Cola",
  product: "Coca-Cola",
  description: "Brotherly Love” captures the unique relationship between brothers, a universal story of love and conflict. Ultimately the younger brother finds himself without his Coca-Cola. The older brother comes to his rescue and they enjoy a special moment together. The spot features a new version of the hit song “Hey Brother” by Avicii.",
  year: Date.today,
  genre_ids: [genres[0].id],
  youtube: '0oYlOBun8UI',
  image: File.open("app/assets/images/snaps/brotherly_love.jpg")
)

hulk = Ad.create!(
  title: "Coke Mini (Hulk vs. Ant-Man)",
  company: "Coca-Cola",
  product: "Coca-Cola",
  description: "Two thirsty heroes. Only one Coca-Cola Mini. Witness an epic chase between Marvel’s biggest and smallest Super Heroes: the Incredible Hulk and Astonishing Ant-Man. Despite their differences in size, Hulk and Ant-Man both know what it’s like to get thirsty. But when there's just one #CokeMini left in the fridge, who will prevail?",
  year: Date.today,
  genre_ids: [genres[0].id, genres[4].id],
  youtube: 'OlZqBR3yTiw',
  image: File.open("app/assets/images/snaps/coke_mini.jpg")
)

polar = Ad.create!(
  title: "\"Catch\" starring NE_Bear",
  company: "Coca-Cola",
  product: "Coca-Cola",
  description: "This game day spot will change depending on the circumstances. If the 2nd quarter is particularly stressful, then NE_Bear will relieve some tension when his friends toss him a Coke...if he can catch it.http://www.CokePolarBowl.com #GameDayPolarBears",
  year: Date.today,
  genre_ids: [genres[0].id, genres[2].id, genres[7].id],
  youtube: 'S2nBBMbjS8w',
  image: File.open("app/assets/images/snaps/ColaPolar.jpg")
)

mut = Ad.create!(
  title: "Yıl - Mutluluk Kamyonu",
  company: "Coca-Cola",
  product: "Coca-Cola",
  description: "Coca-Cola'nın 125. Yılında insanlara mutluluk dağıttığı kamyon İstanbul trafiğine çıktı ve Boğaziçi Köprüsü'nde yüzlerce insana şaşırtıcı anlar yaşattı.",
  year: Date.today,
  genre_ids: [genres[0].id],
  youtube: 'zV7N21LSr_Y',
  image: File.open("app/assets/images/snaps/mutluluk.jpg")
)

trans = Ad.create!(
  title: "Transformer - Coca-Cola Hong Kong",
  company: "Coca-Cola",
  product: "Coca-Cola",
  description: "Two cosplayers dressing up as cokacola transformers during a Japanese Convention. Where Will Happiness Strike Next?.",
  year: Date.today,
  genre_ids: [genres[0].id, genres[2].id],
  youtube: 'RZd2NDzQzA4',
  image: File.open("app/assets/images/snaps/cola_transformer.jpg")
)

london = Ad.create!(
  title: "Happiness Machine London",
  company: "Coca-Cola",
  product: "Coca-Cola",
  description: "Coca-Cola is unleashing happiness again, this time in the UK! The much-anticipated sequel to the global internet sensation -- the Coca-Cola Happiness Machine which caught the world's imagination earlier this year with one million views in the first week alone.",
  year: Date.today,
  genre_ids: [genres[0].id, genres[2].id],
  youtube: 'M0D3jKLz6sA',
  image: File.open("app/assets/images/snaps/cola_london.jpg")
)

temple = Ad.create!(
  title: "Very Funny Pepsi Commercial",
  company: "Pepsi",
  product: "Pepsi",
  description: "It's a very funny Pepsi commercial with Chinese Monks. An Airbender Parody",
  year: Date.today,
  genre_ids: [genres[0].id, genres[2].id],
  youtube: '40DykbPa4Lc',
  image: File.open("app/assets/images/snaps/temple_pepsi.jpg")
)
roller = Ad.create!(
  title: "Pepsi Roller Coaster Commercial",
  company: "Pepsi",
  product: "Pepsi",
  description: "Pepsi on a roller coaster, whose the Girl?",
  year: Date.today,
  genre_ids: [genres[0].id, genres[2].id],
  youtube: 'WMI3nDccXtc',
  image: File.open("app/assets/images/snaps/pepsi_coaster.jpg")
)
car = Ad.create!(
  title: "The Chase",
  company: "Hyundai",
  product: "2017 Hyundai Elantra",
  description: "What if you could remotely start your car by simply talking to your smartwatch? The all-new Hyundai Elantra with Blue Link® makes that possible, so when you need to leave in a hurry, even a big hurry, it just may come in handy.",
  year: Date.today,
  genre_ids: [genres[2].id],
  youtube: 'WMI3nDccXtc',
  image: File.open("app/assets/images/snaps/Hyundai.jpg")
)
car2 = Ad.create!(
  title: "\"Bull\" Matthew McConaughey and the MKC",
  company: "Lincoln Motor Co",
  product: "2015 Lincoln MKC",
  description: "We’re introducing the first-ever Lincoln MKC with Matthew McConaughey. Sometimes it’s better to take the long way. Visit http://www.Lincoln.com/MKC to learn more. #InTheMoment.",
  year: Date.today,
  genre_ids: [genres[2].id],
  youtube: 'FoGGDKV88Fg',
  image: File.open("app/assets/images/snaps/Hyundai.jpg")
)


polar.features.create!
car.features.create!

ads = []
real_ads = [car, car2, bro, hulk, polar, mut, trans, london, temple, roller]

100.times do |i|
  g_ids = genres.sample(rand(3)+1).map{ |g| g.id }
  ads.push(Ad.create!(
    title: Faker::Superhero.power,
    company: Faker::Company.name,
    product: Faker::Superhero.name,
    description: Faker::Lorem.paragraph,
    year: Faker::Date.between(1.year.ago, Date.today),
    genre_ids: g_ids,
    youtube: youtube.sample(1),
    image: File.open("app/assets/images/random_ads/" + rand(60).next.to_s + ".jpg")
  ))
end

20.times do |user|
  t = User.create!(email: Faker::Internet.free_email, password: "lolcats" )
  ads.sample(60).each do |ad|
    t.views.create!(
      ad_id: ad.id,
      rate: rand(5) + 1,
      title: Faker::Hipster.word,
      review: Faker::Hipster.paragraph(10)
      )
  end
  real_ads.each do |ad|
    t.views.create!(
      ad_id: ad.id,
      rate: rand(3) + 3,
      title: Faker::Hipster.word,
      review: Faker::Hipster.paragraph(10)
      )
  end
end
