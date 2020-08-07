json.user do
  json.partial! "user", user: @user
end

json.skills Hash[@skills.map { |skill| [skill.id, skill] }]
