class AddAlbumToPhotos < ActiveRecord::Migration[5.1]
  def change
    add_reference :photos, :album, foreign_key: true
  end
end
