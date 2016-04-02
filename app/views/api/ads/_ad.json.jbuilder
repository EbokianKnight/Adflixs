json.extract!( ad, :title, :youtube, :description, :product, :company, :year, :id )

if show_genres
  json.genres do
    json.array!(ad.genres) do |genre|
      json.partial!('api/genres/genre', genre: genre, show_ads: false)
    end
  end
end
