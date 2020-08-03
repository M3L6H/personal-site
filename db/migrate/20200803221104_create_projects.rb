class CreateProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :projects do |t|
      t.string :name, null: false, limit: 64
      t.text :summary, null: false, limit: 1024
      t.text :description, null: false
      t.timestamps
    end
  end
end
