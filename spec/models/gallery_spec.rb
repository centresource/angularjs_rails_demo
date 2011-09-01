require 'spec_helper'

describe Gallery do

  it "should respond to #title" do
    Gallery.new.should respond_to(:title)
  end

  it "should respond to #photographer" do
    Gallery.new.should respond_to(:photographer)
  end

  it "should respond to #photographer=" do
    Gallery.new.should respond_to(:photographer=)
  end

  it "should respond to #photos" do
    Gallery.new.should respond_to(:photos)
  end

end
