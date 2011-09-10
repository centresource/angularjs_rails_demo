require 'spec_helper'

describe SelectedPhoto do

  it "should respond to #title" do
    SelectedPhoto.new.should respond_to(:title)
  end

  it "should respond to #title=" do
    SelectedPhoto.new.should respond_to(:title=)
  end

  describe "#photo=" do
    it "should assign the photo" do
      s = SelectedPhoto.new
      photo = Photo.create!(:title => 'My Photo')
      s.photo = photo
      s.photo.should eq(photo)
    end
  end

  describe "#photo" do
    it "should return the selected photo" do
      s = SelectedPhoto.new
      photo = Photo.create!(:title => 'My Photo')
      s.photo = photo
      s.photo.should eq(photo)
    end
  end

  describe "#as_json" do
    it "should include the id, title, and image urls" do
      photo = Photo.create!(:image => File.new(Rails.root + 'photos/1_1.jpg'), :title => 'My Photo')
      s = SelectedPhoto.new(:title => 'My Selected Title', :photo => photo)
      s.as_json['image_gallery_url'].should == photo.image.url(:gallery)
      s.as_json['image_large_url'].should == photo.image.url(:large)
      s.as_json['image_original_url'].should == photo.image.url(:original)
    end
  end

end
