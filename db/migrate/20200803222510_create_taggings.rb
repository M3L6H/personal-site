class CreateTaggings < ActiveRecord::Migration[5.2]
  def change
    create_table :taggings do |t|
      t.references :taggable, polymorphic: true, null: false
      t.bigint :tag_id, null: false
      t.timestamps
    end

    add_index :taggings, [:taggable_id, :taggable_type, :tag_id], unique: true
  end
end
