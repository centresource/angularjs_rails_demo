require 'spec_helper'

describe "Photographers", :js => true do

  describe "GET /photographers" do

    it "displays photographers" do
      Photographer.create!(:name => 'Anne Geddes')
      Photographer.create!(:name => 'Ansel Adams')
      visit '/#' + photographers_path
      page.should have_content('Anne Geddes')
      page.should have_content('Ansel Adams')
    end

  end

  describe "click a photographer's name" do

    it "should go to that photographer's galleries index" do
      photographer = Photographer.create!(:name => 'Anne Geddes')
      visit '/#' + photographers_path
      find_link('Anne Geddes')[:href].should =~ Regexp.new('/#' + photographer_galleries_path(:photographer_id => photographer.id))
      click_link('Anne Geddes')
    end

  end

end
