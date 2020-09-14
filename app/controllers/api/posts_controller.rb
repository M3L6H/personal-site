class Api::PostsController < ApplicationController
  before_action :require_admin, except: [:index, :show]
  before_action :require_json, only: [:index, :show]

  def index
    query = params[:query] || ""
    escaped = "%#{ query.gsub("%", "\\\\\%").gsub("_", "\\\\\_") }%"
    @posts = Post
      .includes(:tags)
      .where("title ILIKE ? OR tags.name ILIKE ?", escaped, escaped)
  end

  def show
    @post = Post.find_by(id: params[:id])
    unless @post
      render json: { id: ["Could not find post with id #{ params[:id] }"] }, status: 404
    else
      render :show
    end
  end

  def create
    @post = Post.new(post_params)
    if @post.create
      params[:tags].each do |tag|
        t = Tag.find_by(name: tag) || Tag.create!(name: tag)
        Tagging.create(taggable_type: "Post", taggable_id: @post.id, tag_id: t.id)
      end
      render :create
    else
      render json: convert_errors(@post.errors), status: 422
    end
  end

  def update
    @post = Post.find_by(id: params[:id])
    
    if @post
      if @post.update(post_params)
        render :update
      else
        render json: convert_errors(@post.errors), status: 422
      end
    else
      render json: { id: ["Could not find post with id #{ params[:id] }"] }, status: 404
    end
  end

  def destroy
    @post = Post.find_by(id: params[:id])

    if @post
      @post.destroy
      render :destroy
    else
      render json: { id: ["Could not find post with id #{ params[:id] }"] }, status: 404
    end
  end

private
  def post_params
    params.require(:post).permit(:title, :body)
  end
end
