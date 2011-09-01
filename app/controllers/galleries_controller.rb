class GalleriesController < ApplicationController

  before_filter :find_containing_resource
  before_filter :find_resources, :only => [:index]
  before_filter :find_resource, :except => [:index]

  respond_to :json

  def index
    respond_with @galleries
  end

  def show
    respond_with @gallery
  end

  private

  def find_containing_resource
    @photographer = Photographer.find(params[:photographer_id])
  end

  def find_resources
    @galleries = @photographer.galleries
  end

  def find_resource
    @gallery = @photographer.galleries.find(params[:id])
  end

end
