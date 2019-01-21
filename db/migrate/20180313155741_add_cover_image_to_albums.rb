class AddCoverImageToAlbums < ActiveRecord::Migration[5.1]
  def up
      add_attachment :albums, :coverimage
    end

    def down
      remove_attachment :albums, :coverimage
    end
end
