# == Schema Information
#
# Table name: projects
#
#  id          :bigint           not null, primary key
#  description :text             not null
#  name        :string(64)       not null
#  summary     :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Project < ApplicationRecord
  validates :description, :name, :summary, presence: true
  validates :name, length: { maximum: 64 }
  validates :summary, length: { maximu: 1024 }

  has_one_attached :photo
  has_many :taggings, as: :taggable
end
