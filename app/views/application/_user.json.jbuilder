# Expects user
json.extract! user, :username, :id, :admin, :bio
json.photo user.photo.attached? ? url_for(user.photo) : nil