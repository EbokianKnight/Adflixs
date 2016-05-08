json.extract!( ad, :title, :youtube, :description, :product, :company, :year, :id )
json.average ad.average_rate

if (ad.image)
  json.largeUrl asset_path(ad.image.url(:large))
  json.thumbUrl asset_path(ad.image.url(:thumb))
end

if show_more_details
  json.genres do
    json.array!(ad.genres) do |genre|
      json.partial!('api/genres/genre', genre: genre, show_ads: false)
    end
  end
  json.views do
    json.array!(ad.views.order('updated_at DESC')) do |view|
      json.partial!('api/views/view', view: view)
    end
  end
end
