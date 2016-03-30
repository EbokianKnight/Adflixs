# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

fun = Genre.create!(name: "funny")
drink = Genre.create!(name: "drinks")
prev = Genre.create!(name: "previews")

movie1 = Ad.create!(description:"This is a serious movie", year:2015, company:"SeriousMovieStudios", product:"Stern")
movie2 = Ad.create!(description:"This is a funny movie", year:2015, company:"MovieStudios", product:"Jokes Ahoy")
funny1 = Ad.create!(description:"Sexy Humor", year:2016, company:"BeerCompany", product:"Beer")
funny2 = Ad.create!(description:"Polar Bear chases a Coke bottle", year:2016, company:"Coke", product:"Coke")
drinks1 = Ad.create!(description:"Someone drinks a pepsi", year:2014, company:"Pepsi", product:"Pepsi")
drinks2 = Ad.create!(description:"Someone made a movie about sprite", year:2016, company:"Coke", product:"Sprite TheMovie")

AdGenre.create!(ad_id: movie1.id, genre_id: prev.id )
AdGenre.create!(ad_id: movie2.id, genre_id: fun.id )
AdGenre.create!(ad_id: movie2.id, genre_id: prev.id )
AdGenre.create!(ad_id: funny1.id, genre_id: fun.id )
AdGenre.create!(ad_id: funny1.id, genre_id: drink.id )
AdGenre.create!(ad_id: funny2.id, genre_id: drink.id )
AdGenre.create!(ad_id: funny2.id, genre_id: fun.id )
AdGenre.create!(ad_id: drinks1.id, genre_id: drink.id )
AdGenre.create!(ad_id: drinks2.id, genre_id: drink.id )
AdGenre.create!(ad_id: drinks2.id, genre_id: prev.id )
