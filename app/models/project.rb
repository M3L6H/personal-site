# == Schema Information
#
# Table name: projects
#
#  id          :bigint           not null, primary key
#  description :text             not null
#  github      :string           not null
#  live        :string
#  summary     :text             not null
#  title       :string(64)       not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Project < ApplicationRecord
  validates :description, :title, :summary, :github, presence: true
  validates :title, length: { maximum: 64 }
  validates :summary, length: { maximum: 1024 }

  has_one_attached :photo
  has_many :taggings, as: :taggable
end
