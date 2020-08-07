# == Schema Information
#
# Table name: skills
#
#  id         :bigint           not null, primary key
#  category   :string           not null
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_skills_on_name  (name) UNIQUE
#
class Skill < ApplicationRecord
  validates :category, :name, presence: true
  validates :name, uniqueness: true
end
