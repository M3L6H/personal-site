class Api::ProjectsController < ApplicationController
  before_action :require_admin, except: [:index, :show]
  before_action :require_json, only: [:index, :show]
  
  def create
    @project = Project.new(project_params)

    if @project.save
      render :create
    else
      render json: convert_errors(@project.errors), status: 422
    end
  end

private
  def project_params
    params.require(:project).permit(:title, :description, :summary, :photo)
  end
end
