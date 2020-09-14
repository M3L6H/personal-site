# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  body       :text             not null
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_posts_on_title  (title) UNIQUE
#
class Post < ApplicationRecord
  validates :body, :title, presence: true
  validates :title, uniqueness: true

  # Associations
  has_many :taggings, as: :taggable
  has_many :tags, through: :taggings, source: :tag
  has_many_attached :images
end
