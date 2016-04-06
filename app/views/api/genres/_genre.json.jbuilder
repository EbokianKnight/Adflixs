json.extract!( genre, :name, :id )

if pages
  json.pages pages
end


if show_ads
  json.ads do
    json.array!(genre.ads) do |ad|
      json.partial!('api/ads/ad', ad: ad, show_genres: false)
    end
  end
end
