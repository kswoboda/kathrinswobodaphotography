json.extract! photo, :id, :priority, :created_at, :updated_at
json.url photo_url(photo, format: :json)
