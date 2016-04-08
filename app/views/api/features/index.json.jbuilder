json.ads do
  json.array!(@features) do |feature|
    json.partial!('api/ads/ad', ad: feature.ad, show_genres: true)
  end
end
