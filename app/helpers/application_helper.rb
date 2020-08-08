module ApplicationHelper
  def json_partial_or_null(json, name:, local:, object:, partial:)
    json.set! name do
      object.blank? ? json.null! : json.partial!(partial, local => object)
    end
  end
end
