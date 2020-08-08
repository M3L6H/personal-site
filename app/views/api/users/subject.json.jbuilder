json.user do
  json.partial! "user", user: @user
end

json.skills Hash[@skills.map { |skill| [skill.id, skill] }]

json.projects Hash[@projects.map { |project| [project.id, project] }]
