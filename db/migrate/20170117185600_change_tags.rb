class ChangeTags < ActiveRecord::Migration[5.0]
  def change
    rename_column :tags, :xcoord, :x
    rename_column :tags, :ycoord, :y
  end
end
