class GalleriesController < ApplicationController

	def show
		@albums = Album.all
	end
end
