json.post do
  json.extract! post, :id, :title, :body, :created_at
end

json.taggings do
  if post.taggings.empty?
    json.null!
  else
    json.set! post.id do
      json.array! post.taggings do |tagging|
        json.tag_id tagging.tag_id
      end
    end
  end
end

json.tags do
  if post.tags.empty?
    json.null!
  else
    post.tags.each do |tag|
      json.set! tag.id do
        json.extract! tag, :id, :name
      end
    end
  end
end
