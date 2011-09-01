class PhotosController < ApplicationController

  before_filter :find_containing_resource
  before_filter :find_resources, :only => [:index]

  respond_to :json

  def index
    respond_with @photos
  end

  private

  def find_containing_resource
    @photographer = Photographer.find(params[:photographer_id])
    @gallery = @photographer.galleries.find(params[:gallery_id])
  end

  def find_resources
    @photos = @gallery.photos
  end

end
