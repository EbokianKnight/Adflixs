json.array!(@ads) do |ad|
	json.partial!('ad', ad: ad, show_more_details:false)
end
