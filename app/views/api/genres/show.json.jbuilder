json.extract!( genre, :name, :id )
json.ads do
  json.array!(genre.ads) do |ad|
    json.partial!('api/ads/ad', ad: ad, show_more_details: false)
  end
end
