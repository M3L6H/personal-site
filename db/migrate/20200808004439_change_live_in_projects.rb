class ChangeLiveInProjects < ActiveRecord::Migration[5.2]
  def change
    change_column_null :projects, :live, true
  end
end
