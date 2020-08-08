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

json.tags Hash[@tags.map { |tag| [tag.id, tag] }]

json.taggings Hash[@taggings.map { |tagging| ["#{ tagging.taggable_type }-#{ tagging.taggable_id }", tagging.tag_id] }]
