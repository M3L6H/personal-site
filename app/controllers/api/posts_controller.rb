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
  end
end
