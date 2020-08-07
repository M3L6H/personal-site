json.user do
  json.partial! "user", user: @user
end

json.skills do
  @skills.each do |skill|
    json.set! skill.id do
      json.partial! "skill", skill: skill
    end
  end
end
