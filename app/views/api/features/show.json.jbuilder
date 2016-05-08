json.ads do
  json.partial!('api/ads/ad', ad: @feature[ad], show_more_details: false)
end
