# == Schema Information
#
# Table name: skills
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_skills_on_name  (name) UNIQUE
#
class Skill < ApplicationRecord
  validates :name, presence: true, uniqueness: true
end
