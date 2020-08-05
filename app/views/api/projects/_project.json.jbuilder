# Expects a project 

json.extract! project, :title, :description, :summary
json.photo project.photo.attached? ? url_for(project.photo) : nil