class UpdatingTags < ActiveRecord::Migration[5.0]
  def change
    add_column :tags, :xcoord, :float
    add_column :tags, :ycoord, :float
    add_column :tags, :name_id, :integer
    remove_column :tags, :name
  end
end
