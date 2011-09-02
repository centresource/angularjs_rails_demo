require 'spec_helper'

describe "SelectedPhotos", :js => true do

  describe "remove a photo" do

    it "should remove the photo from the interface and update the database" do
      photographer = Photographer.create!(:name => 'Anne Geddes')
      gallery = photographer.galleries.create!(:title => 'Ghost Ranch')
      photo = gallery.photos.create!(:title => 'My Photo')
      selected_photos = SelectedPhoto.create!(:photo => photo)
      visit '/#' + photographer_gallery_photos_path(:photographer_id => photographer.id,
                                                    :gallery_id => gallery.id)
      SelectedPhoto.count.should == 1
      page.should have_selector(".selected_photo")
      find(".delete").click
      # delay so the click has time to not only return, but also update bound data
      sleep(0.2)
      page.should_not have_selector(".selected_photo")
      SelectedPhoto.count.should == 0
    end

  end

end
