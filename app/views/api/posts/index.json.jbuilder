json.posts do
  if @posts.empty?
    json.null!
  else
    @posts.each do |post|
      json.set! post.id do
        json.extract! post, :id, :title, :body
      end
    end
  end
end

json.taggings do
  if @posts.empty?
    json.null!
  else
    @posts.each do |post|
      json.set! post.id do
        json.array! post.taggings do |tagging|
          json.tag_id tagging.tag_id
        end
      end
    end
  end
end

json.tags do
  if @posts.empty?
    json.null!
  else
    @posts.each do |post|
      post.tags.each do |tag|
        json.set! tag.id do
          json.extract! tag, :id, :name
        end
      end
    end
  end
end
