json.extract!( user, :email, :id, :admin )

json.views do
  json.array!(user.views) do |view|
    json.partial!('api/views/view', view: view)
  end
end
