# == Schema Information
#
# Table name: taggings
#
#  id            :bigint           not null, primary key
#  taggable_type :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  tag_id        :bigint           not null
#  taggable_id   :bigint           not null
#
# Indexes
#
#  index_taggings_on_taggable_id_and_taggable_type_and_tag_id  (taggable_id,taggable_type,tag_id) UNIQUE
#  index_taggings_on_taggable_type_and_taggable_id             (taggable_type,taggable_id)
#
class Tagging < ApplicationRecord
  validates :taggable_type, presence: true
  validates :tag_id, uniqueness: { scope: [:taggable_id, :taggable_type] }

  belongs_to :tag
  belongs_to :taggable, polymorphic: true
end
