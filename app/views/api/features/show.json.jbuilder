json.ads do
  json.partial!('api/ads/ad', ad: @feature[ad], show_genres: true)
end
