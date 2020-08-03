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
require 'test_helper'

class TaggingTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
