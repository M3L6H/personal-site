class Api::TaggingsController < ApplicationController
  before_action :require_logged_in
  before_action :require_admin
  before_action :require_json
  
  def create
    # We need to figure out what we are creating a tag for
    if tagging_params[:project_id]
      tag = tag.find_by(name: tagging_params[:tag])

      if !tag
        tag = Tag.new(name: tagging_params[:tag])

        if !tag.save
          render json: { tag: ["Could not create tag with name #{ tagging_params[:tag] }"] }, status: 422
          return
        end
      end

      taggable_type = "Project"
      taggable_id = tagging_params[:project_id]
      tag_id = tag.id

      @tagging = Tagging.new(tag: tag, taggable_type: taggable_type, taggable_id: taggable_id)
      render :create
    else
      render json: { type: ["Unrecognized tagging type"] }, status: 422
    end
  end

  def destroy
    @tagging = Tagging.find_by(params[:id])

    if @tagging
      @tagging.destroy
      render :destroy
    else
      render json: { id: "Could not find tagging with id #{ params[:id] }"}, status: 404
    end
  end

private
  def tagging_params
    params.require(:tagging).permit(:project_id, :tag)
  end
end
