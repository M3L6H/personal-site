# Expects user

json.user do
  json.extract! user, :username, :id, :admin
end