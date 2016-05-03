json.extract!( genre, :name, :id )

if show_ads
  json.pages pages
  json.ads do
    json.array!(genre.ads) do |ad|
      next if ad.title == "RegisterViewsWithUser"
      json.partial!('api/ads/ad', ad: ad, show_genres: false)
    end
  end
end
