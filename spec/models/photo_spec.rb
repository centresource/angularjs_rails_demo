require 'spec_helper'

describe Photo do

  it "should respond to #title" do
    Photo.new.should respond_to(:title)
  end

  it "should respond to #gallery" do
    Photo.new.should respond_to(:gallery)
  end

  it "should respond to #gallery=" do
    Photo.new.should respond_to(:gallery=)
  end

  it "should respond to #image" do
    Photo.new.should respond_to(:image)
  end

  describe "#as_json" do
    it "should include the id, title, and image urls" do
      photo = Photo.create!(:image => File.new(Rails.root + 'photos/1_1.jpg'), :title => 'My Photo')
      photo.as_json['image_gallery_url'].should == photo.image.url(:gallery)
      photo.as_json['image_large_url'].should == photo.image.url(:large)
      photo.as_json['image_original_url'].should == photo.image.url(:original)
    end
  end

end
