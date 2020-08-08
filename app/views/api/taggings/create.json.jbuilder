json.tagging do
  json.partial! "tagging", tagging: @tagging
end

json.tag do
  json.extract! Tag.find(@tagging.tag_id), :name, :id
end
