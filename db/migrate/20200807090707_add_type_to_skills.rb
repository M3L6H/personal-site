class AddTypeToSkills < ActiveRecord::Migration[5.2]
  def change
    add_column :skills, :category, :string, null: false
  end
end
