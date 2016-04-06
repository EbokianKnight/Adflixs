json.array!(@genres) do |genre|
	json.partial!('genre', genre: genre, show_ads: true,  pages: @page_count)
end
