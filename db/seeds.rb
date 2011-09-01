# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)

photographer1 = Photographer.create!(:name => 'Ganne Eddes')
photographer2 = Photographer.create!(:name => 'Smada Lesna')

gallery = photographer1.galleries.create!(:title => 'Ghost Ranch')
6.times do |i|
  gallery.photos.create!(:image => File.new(Rails.root + "photos/2_#{i + 1}.jpg"), :title => "Ghost Ranch #{i + 1}")
end
gallery = photographer2.galleries.create!(:title => 'Greyscale')
7.times do |i|
  gallery.photos.create!(:image => File.new(Rails.root + "photos/1_#{i + 1}.jpg"), :title => "Greyscale #{i + 1}")
end
gallery = photographer2.galleries.create!(:title => 'Colorful')
8.times do |i|
  gallery.photos.create!(:image => File.new(Rails.root + "photos/3_#{i + 1}.jpg"), :title => "Colorful #{i + 1}")
end
