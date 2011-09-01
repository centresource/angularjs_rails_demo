class PhotographersController < ApplicationController

  before_filter :find_resources, :only => [:index]
  before_filter :find_resource, :except => [:index]

  respond_to :json

  def index
    respond_with @photographers
  end

  def show
    respond_with @photographer
  end

  private

  def find_resources
    @photographers = Photographer.all
  end

  def find_resource
    @photographer = Photographer.find(params[:id])
  end

end
