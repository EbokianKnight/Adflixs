json.array!(@favorites) do |ad|
	json.partial!('api/ads/ad', ad: ad, show_genres: true)
end
