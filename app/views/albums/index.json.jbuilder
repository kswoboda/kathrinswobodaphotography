json.array!(@albums) do |album|
  json.name album.name
  json.id album.id
  json.coverimage album.photos.first.picture.url
end