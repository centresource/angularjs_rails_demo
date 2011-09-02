require 'spec_helper'

describe "Photos", :js => true do

  describe "GET /photographers/id/galleries/id/photos" do

    it "displays photos" do
      photographer = Photographer.create!(:name => 'Anne Geddes')
      gallery = photographer.galleries.create!(:title => 'Ghost Ranch')
      gallery.photos.create!(:title => 'My Photo')
      visit '/#' + photographer_gallery_photos_path(:photographer_id => photographer.id,
                                                    :gallery_id => gallery.id)
      page.should have_content('My Photo')
    end

  end

  describe "click a photo" do

    it "should add the photo to 'selected photos'" do
      photographer = Photographer.create!(:name => 'Anne Geddes')
      gallery = photographer.galleries.create!(:title => 'Ghost Ranch')
      photo = gallery.photos.create!(:title => 'My Photo')
      visit '/#' + photographer_gallery_photos_path(:photographer_id => photographer.id,
                                                    :gallery_id => gallery.id)
      SelectedPhoto.count.should == 0
      find(".photo").click
      # delay so the click has time to not only return, but also update bound data
      sleep(0.2)
      SelectedPhoto.count.should == 1
    end

  end

end
