json.feature do
  json.array!(@features) do |feature|
    json.partial!('api/ads/ad', ad: feature.ad, show_more_details: true)
  end
end
