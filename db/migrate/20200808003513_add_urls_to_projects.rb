class AddUrlsToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :live, :string, null: false
    add_column :projects, :github, :string, null: false
  end
end
