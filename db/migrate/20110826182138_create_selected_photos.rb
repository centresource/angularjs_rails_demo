class CreateSelectedPhotos < ActiveRecord::Migration
  def self.up
    create_table :selected_photos do |t|
      t.references :photo
      t.string :title
    end
  end

  def self.down
    drop_table :selected_photos
  end
end
