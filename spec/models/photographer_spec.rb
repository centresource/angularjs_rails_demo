require 'spec_helper'

describe Photographer do

  it "should respond to #name" do
    Photographer.new.should respond_to(:name)
  end

  it "should respond to #galleries" do
    Photographer.new.should respond_to(:galleries)
  end

end
