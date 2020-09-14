class Api::PostsController < ApplicationController
  def index
    query = params[:query] || ""
    escaped = "%#{ query.gsub("%", "\\\\\%").gsub("_", "\\\\\_") }%"
    @posts = Post
      .joins(:tags)
      .where("title ILIKE ? OR tags.name ILIKE ?", escaped, escaped)
  end

  def show
    @post = Post.find_by(id: params[:id])
  end
end
