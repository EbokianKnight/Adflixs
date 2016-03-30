json.array!(@ads) do |ad|
	json.partial!('ad', ad: ad)
end
