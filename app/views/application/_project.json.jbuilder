# Expects a project 
json.extract! project, :id, :title, :description, :summary, :live, :github
json.photo project.photo.attached? ? url_for(project.photo) : nil
