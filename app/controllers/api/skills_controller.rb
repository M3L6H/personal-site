class Api::SkillsController < ApplicationController
  before_action :require_logged_in
  before_action :require_admin
  before_action :require_json
  
  def create
    @skill = Skill.new(skill_params)

    if @skill.save
      render :create
    else
      response.json convert_errors(@skill.errors), status: 422
    end
  end

  def update
    @skill = Skill.find_by(id: params[:id])
    
    if @skill
      if @skill.update(skill_params)
        render :update
      else
        response.json convert_errors(@skill.errors), status: 422
      end
    else
      response.json { id: ["Could not find skill with id #{ params[:id] }"] }, status: 404
    end
  end

  def destroy
    @skill = Skill.find_by(id: params[:id])

    if @skill
      @skill.destroy
      render :destroy
    else
      response.json { id: ["Could not find skill with id #{ params[:id] }"] }, status: 404
    end
  end

private
  def skill_params
    params.require(:skill).permit(:name)
  end
end
