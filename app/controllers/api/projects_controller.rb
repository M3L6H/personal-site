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

  def update
    @project = Project.find_by(id: params[:id])

    if @project
      if @project.update(project_params)
        render :update
      else
        render json: convert_errors(@project.errors), status: 422
      end
    else
      render json: { id: ["Could not find project with id #{ params[:id] }"] }, status: 404
    end
  end

private
  def project_params
    params.require(:project).permit(:title, :description, :summary, :photo, :live, :github)
  end
end
