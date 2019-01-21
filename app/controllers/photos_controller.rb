class PhotosController < ApplicationController
  before_action :set_photo, only: [:show, :edit, :update, :destroy]

  # GET /photos
  # GET /photos.json
  def index
    @photos = Photo.order(:priority)
  end

  # GET /photos/1
  # GET /photos/1.json
  def show
  end

  # GET /photos/new
  def new
    @photo = Photo.new
    @albums = Album.all
  end

  # GET /photos/1/edit
  def edit
  end

  # POST /photos
  # POST /photos.json
  def create
    @photo = Photo.new(photo_params)

    respond_to do |format|
      if @photo.save
        save_to_json        
        format.html { redirect_to @photo, notice: 'Photo was successfully created.' }
        format.json { render :show, status: :created, location: @photo }
      else
        format.html { render :new }
        format.json { render json: @photo.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /photos/1
  # PATCH/PUT /photos/1.json
  def update
    respond_to do |format|
      if @photo.update(photo_params)
        save_to_json
        format.html { redirect_to @photo, notice: 'Photo was successfully updated.' }
        format.json { render :show, status: :ok, location: @photo }
      else
        format.html { render :edit }
        format.json { render json: @photo.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /photos/1
  # DELETE /photos/1.json
  def destroy
    album=@photo.album
    @photo.destroy
    save_to_json
    respond_to do |format|
      format.html { redirect_to album_path(album), notice: 'Photo was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

    def save_to_json
      Album.all.each do |a|
        photos = a.photos.order(:priority)
        photolist = photos.map do |p|
          { :id => p.id, :url => "/public" + p.picture.url, :width => p.width }
        end
        json = photolist.to_json
        target = Rails.root.join("json", a.name + ".json") 
        File.open(target, "w") do |f|
          f.write(json)
        end
      end
      
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_photo
      @photo = Photo.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def photo_params
      params.require(:photo).permit(:priority, :picture, :album_id, :width)
    end
end
