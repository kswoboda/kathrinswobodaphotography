require 'json'
require 'fileutils'
require 'green_shoes'

class PhotoManager
	def initialize(images="images", structures="json")
 		@images = images
 		@structures = structures
 	end

 	def getAlbums
 		return Dir.entries(@images).select{ |item| item[0] != "." }
 	end

 	def getAlbumImages(album)
 		return Dir.entries(File.join(@images, album)).select{ |item| item[0] != "." }
 	end

 	def getAlbumsJSON(json)
 		f = File.read(File.join(@structures, json))
 		albumsHash = JSON.parse(f)

 		return albumsHash
 	end

 	def getAlbumImagesJSON(albumName)
 		f = File.read(File.join(@structures, albumName + ".json"))
 		albumsHash = JSON.parse(f)

 		return albumsHash
 	end

 	def addAlbum(albumName, json, i)
 		# create directory
 		Dir.mkdir(File.join(@images, albumName))
 		# create json file
 		out_file = File.new(File.join(@structures, albumName + ".json"), "w")
 		out_file.puts([].to_json)
 		out_file.close
 		# add to json file
 		albumsHash = self.getAlbumsJSON(json)
 		newAlbum = {"name" => albumName}
 		albumsHash.insert(i, newAlbum)
 		f = File.open(File.join(@structures, json), "w")
 		f.puts(albumsHash.to_json)
 		f.close
 	end

 	def removeAlbum(albumName)
 		# delete folder
 		FileUtils.rm_rf(File.join(@images, albumName))
 		# remove json file
 		FileUtils.rm_rf(File.join(@structures, albumName + ".json"))
 		# remove from json file
 		albumsHash = self.getAlbumsJSON(json)
 		album = {"name" => albumName}
 		albumsHash.delete(album)
 		f = File.open(File.join(@structures, json), "w")
 		f.puts(albumsHash.to_json)
 		f.close

 	end

 	def addPhoto(photo, album, i) 		
 		# copy photo into folder
 		FileUtils.cp(photo, File.join(@images, album))
 		# add to json file
 		imgHash = self.getAlbumImagesJSON(album)
 		imgName = File.basename(photo)
 		newImg = {"name" => imgName}
 		imgHash.insert(i,newImg)
 		puts(imgHash)
 		f = File.open(File.join(@structures, album + ".json"), "w")
 		f.puts(imgHash.to_json)
 		f.close
 	end

 	def removePhoto(photo, album)
 		# Delete photo
 		FileUtils.rm(File.join(@images, album, photo))
 		# remove from json file
 		imgHash = self.getAlbumImagesJSON(album)
 		imgName = File.basename(photo)
 		oldImg = {"name" => imgName}
 		imgHash.delete(oldImg)
 		puts(imgHash)
 		f = File.open(File.join(@structures, album + ".json"), "w")
 		f.puts(imgHash.to_json)
 		f.close
 	end


 end

class TestPhotoManager
 	def initialize
 		@pm = PhotoManager.new
 	end

 	def testGetAlbums
 		albums = @pm.getAlbums
 		puts albums
 	end

 	def testGetAlbumImages(album)
 		imgs = @pm.getAlbumImages(album)
 		puts imgs
 	end

 	def testGetAlbumsJson
 		json = @pm.getAlbumsJSON("images.json")
 		puts json
 	end

 	def testGetAlbumImagesJson
 		json = @pm.getAlbumImagesJSON("Backyard Birds")
 		puts json
 	end

 	def testAddPhoto
 		@pm.addPhoto("Nature\ Creatives/MYN-2-6.jpg", "Favorites", 0)
 	end

 	def testRemovePhoto
 		@pm.addPhoto("Nature\ Creatives/MYN-2-6.jpg", "Favorites", 0)
 		@pm.removePhoto("MYN-2-6.jpg", "Favorites")
 	end
end

photoPath = ask_open_file
pm = PhotoManager.new
print "Album name: " 
albumName = gets.chomp
imgs = pm.getAlbumImages(albumName)
i = 0
imgs.each {
	|x| puts i.to_s
	puts x
	i += 1
}
puts i.to_s
puts "Pick a position for the new photo"
print "Insert position: "
pos = gets.chomp.to_i
pm.addPhoto(photoPath, albumName, pos)







