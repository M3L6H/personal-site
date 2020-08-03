# == Schema Information
#
# Table name: tags
#
#  id         :bigint           not null, primary key
#  name       :string(64)       not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_tags_on_name  (name) UNIQUE
#
class Tag < ApplicationRecord
  validates :name, uniqueness: true, presence: true

  has_many :taggings
end
