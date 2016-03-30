json.array!(@ads) do |ad|
	json.partial!('ad', ad: ad, show_genres:false)
end
