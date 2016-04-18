json.extract!( user, :email, :id, :admin )

truth = user.provider ? true : false
json.oauth truth

json.views do
  json.array!(user.views) do |view|
    json.partial!('api/views/view', view: view)
  end
end
