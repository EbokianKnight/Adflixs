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


funny = Genre.create!(name: "funny")
cars = Genre.create!(name: "cars")
previews = Genre.create!(name: "previews")
foods = Genre.create!(name: "foods")
drinks = Genre.create!(name: "drinks")
clothing = Genre.create!(name: "clothing")
arty = Genre.create!(name: "arty")
animals = Genre.create!(name: "animals")
politics = Genre.create!(name: "politics")
tech = Genre.create!(name: "tech")

genres = [funny,cars,previews,foods,drinks,clothing,arty,animals,politics,tech]
g_ids = genres.sample(rand(3)+1).map{ |g| g.id }

200.times do |i|
  g_ids = genres.sample(rand(3)+1).map{ |g| g.id }
  Ad.create!(
    title: Faker::Superhero.power,
    company: Faker::Company.name,
    product: Faker::Superhero.name,
    description: Faker::Lorem.paragraph,
    year: Faker::Date.between(1.year.ago, Date.today),
    genre_ids: g_ids
  )
end
