class AddWidthToPhoto < ActiveRecord::Migration[5.1]
  def change
  	add_column :photos, :width, :string, :default => "width-m"
  end
end
