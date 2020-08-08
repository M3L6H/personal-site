json.user do
  json.partial! "user", user: @user
end

json.skills Hash[@skills.map { |skill| [skill.id, skill] }]

json.projects do
  if @projects.empty?
    json.null!
  else
    @projects.each do |project|
      json.set! project.id do
        json.partial! "project", project: project
      end
    end
  end
end
