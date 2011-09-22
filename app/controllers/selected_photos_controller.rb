class SelectedPhotosController < ApplicationController

  before_filter :find_resources, :only => [:index]
  before_filter :find_resource, :except => [:index, :create]
  before_filter :new_resource, :only => [:create]

  respond_to :json

  def index
    render(:json => @selected_photos)
  end

  def create
    @selected_photo.save
    render(:json => @selected_photo)
  end

  def update
    @selected_photo.update_attributes(params[:selected_photo])
    render(:json => @selected_photo)
  end

  def show
    render(:json => @selected_photo)
  end

  def destroy
    @selected_photo.destroy
    render(:json => {})
  end

  private

  def find_resources
    @selected_photos = SelectedPhoto.all
  end

  def find_resource
    @selected_photo = SelectedPhoto.find(params[:id])
  end

  def new_resource
    @selected_photo = SelectedPhoto.new(params[:selected_photo])
    @selected_photo.title = @selected_photo.photo.title
  end

end
