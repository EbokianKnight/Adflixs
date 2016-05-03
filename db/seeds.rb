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

genres = [
  Genre.create!(name: "drinks"), #0
  Genre.create!(name: "cars"), #1
  Genre.create!(name: "funny"), #2
  Genre.create!(name: "foods"), #3
  Genre.create!(name: "previews"), #4
  Genre.create!(name: "clothing"), #5
  Genre.create!(name: "animals"), #6
  Genre.create!(name: "animated"), #7
  Genre.create!(name: "tech") #8
]

register = Ad.create!(
  title: "RegisterViewsWithUser",
  company: "RegisterViewsWithUser",
  product: "RegisterViewsWithUser",
  description: "RegisterViewsWithUser",
  year: Date.today,
  genre_ids: [genres[0].id, genres[1].id, genres[2].id, genres[3].id, genres[4].id, genres[5].id, genres[6].id, genres[7].id, genres[8].id]
)

guest = User.create!(email: "Guest", password: "password", admin: false)
basetest = User.create!(email: "MyTest", password: "testtest", admin: true)
View.create!(user_id: guest.id, ad_id: register.id)
View.create!(user_id: basetest.id, ad_id: register.id)

youtube = [
  '0oYlOBun8UI', 'OlZqBR3yTiw', 'S2nBBMbjS8w', 'zV7N21LSr_Y', 'RZd2NDzQzA4',
  'M0D3jKLz6sA', '40DykbPa4Lc', 'FoGGDKV88Fg', 'WMI3nDccXtc', 'LT6n1HcJOio',
  'vnVuqfXohxc', 'TPKgC8KPBMg', 'qI-1-cVDrz0', 'Shvwd7VYpE0', 'osSD6bgvyac',
  'jZGzXEExZcc', 'PmD0YKEOh_0', '7ptwjJFgemQ', '_Ut1Ak7zOeE'
]

friends = Ad.create!(
  title: "Friends Furever",
  company: "Google",
  product: "Android",
  description: "You don’t have to be a cute animal to show the world how to “Be Together. Not the Same.” But it definitely helps. Find out more about Android at: http://android.com.",
  year: Date.today,
  genre_ids: [genres[2].id, genres[6].id, genres[8].id],
  youtube: 'vnVuqfXohxc',
  image: File.open("app/assets/images/snaps/Android_BFF3.jpg")
)

bud = Ad.create!(
  title: "Budwiser Lost Dog",
  company: "Budwiser",
  product: "Beer",
  description: "Superbowl Commerical 2015. In the emotional spot, directed by Jake Scott, the Budweiser Clydesdales help the puppy learn the true meaning of friendship by reminding us that #BestBuds always have your back.",
  year: Date.today,
  genre_ids: [genres[2].id, genres[6].id, genres[0].id],
  youtube: 'TPKgC8KPBMg',
  image: File.open("app/assets/images/snaps/Budweiser_Lost_Dog.jpg")
)

cheetos = Ad.create!(
  title: "Cheetos Commercial Party",
  company: "Cheetos",
  product: "Cheetos",
  description: "Cheetos mascot dances with a bunch of construction workers in a half-built house.",
  year: Date.today,
  genre_ids: [genres[2].id, genres[3].id],
  youtube: 'qI-1-cVDrz0',
  image: File.open("app/assets/images/snaps/Cheetos_Party.jpg")
)

siege = Ad.create!(
  title: "Coca-Cola Siege",
  company: "Coca-Cola",
  product: "Coke",
  description: "Most likely Autodesk maya for the main animation/render, zbrush for modelling the characters and their the displacement and normal maps, Nuke or after effects for the postproduction integration and final touch and premiere,final cut, sony vegas or something alike for putting together all the cuts﻿.",
  year: Date.today,
  genre_ids: [genres[0].id, genres[7].id],
  youtube: 'Shvwd7VYpE0',
  image: File.open("app/assets/images/snaps/Coca-Cola_Siege.jpg")
)

spoof = Ad.create!(
  title: "Diet Coke Spoof Commercial",
  company: "Coca-Cola",
  product: "Diet Coke",
  description: "Man dances with coke in front of girls drinking coke. He pulls off his shirt showing his fat off then dumps cola all over himself and the girls like it﻿.",
  year: Date.today,
  genre_ids: [genres[0].id, genres[2].id],
  youtube: 'osSD6bgvyac',
  image: File.open("app/assets/images/snaps/Diet_Coke_Spoof.jpg")
)

iphone = Ad.create!(
  title: "Photos Every Day",
  company: "Apple",
  product: "iPhone 5",
  description: "People from all over the worlf are shown enjoying themselves, taking pictures and videos with their iPhone 5.",
  year: Date.today,
  genre_ids: [genres[8].id, genres[4].id],
  youtube: 'jZGzXEExZcc',
  image: File.open("app/assets/images/snaps/iPhone_Photos_Every_Day.jpg")
)

midas = Ad.create!(
  title: "Canadian Winter Car Chase",
  company: "Midas",
  product: "iPhone 5",
  description: "A blizzard stops a high speed chase dead in its tracks, the vehicles are shown spinning their wheels in place and members of both attempting to push their way in the chase.",
  year: Date.today,
  genre_ids: [genres[1].id, genres[2].id],
  youtube: 'PmD0YKEOh_0',
  image: File.open("app/assets/images/snaps/Midas-Winter-Car-Chase.jpg")
)

dragon = Ad.create!(
  title: "The Dragon",
  company: "United Airlines",
  product: "Airfare",
  description: "An animated paper knight rises from his village and fights a dragon.",
  year: Date.today,
  genre_ids: [genres[2].id, genres[7].id],
  youtube: '7ptwjJFgemQ',
  image: File.open("app/assets/images/snaps/United_Airlines_Dragon.jpg")
)

volts = Ad.create!(
  title: "Werbung Darth Vader",
  company: "Voltswagen",
  product: "VW Passat 2011",
  description: "A kid dresses up as darth vadar and tries to bend things with his mind. When invoking the force against the volts wagon, it lights up and he is shocked. His father fingers the keys.",
  year: Date.today,
  genre_ids: [genres[2].id, genres[1].id],
  youtube: '_Ut1Ak7zOeE',
  image: File.open("app/assets/images/snaps/VW_Darth_Vader.jpg")
)

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

dragon.features.create!
polar.features.create!
car.features.create!

ads = []
real_ads = [
  car, car2, bro, hulk, polar, mut, trans, london, temple, roller,
  friends, bud, cheetos, siege, spoof, iphone, midas, dragon, volts
]

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
  genres.select!{|g| g.length < 30} if genres.length < 3
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
      rate: rand(4) + 2,
      title: Faker::Hipster.word,
      review: Faker::Hipster.paragraph(10)
      )
  end
end
