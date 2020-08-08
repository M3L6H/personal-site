# == Schema Information
#
# Table name: projects
#
#  id          :bigint           not null, primary key
#  description :text             not null
#  github      :string           not null
#  live        :string           not null
#  summary     :text             not null
#  title       :string(64)       not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require 'test_helper'

class ProjectTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
