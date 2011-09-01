require 'spec_helper'

describe "Galleries", :js => true do

  describe "GET /photographers/id/galleries" do

    it "displays galleries" do
      photographer = Photographer.create!(:name => 'Anne Geddes')
      photographer.galleries.create!(:title => 'Ghost Ranch')
      visit '/#' + photographer_galleries_path(:photographer_id => photographer.id)
      page.should have_content('Ghost Ranch')
    end

  end

  describe "click a gallery name" do

    it "should go to that gallery's photo index" do
      photographer = Photographer.create!(:name => 'Anne Geddes')
      gallery = photographer.galleries.create!(:title => 'Ghost Ranch')
      visit '/#' + photographer_galleries_path(:photographer_id => photographer.id)
      find_link('Ghost Ranch')[:href].should =~ Regexp.new('/#' + photographer_gallery_photos_path(:gallery_id => gallery.id, :photographer_id => photographer.id))
      click_link('Ghost Ranch')
    end

  end

end
