json.array!(@genres) do |genre|
	json.partial!('genre', genre: genre, show_ads:false)
end
