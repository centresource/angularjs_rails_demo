class CreatePhotos < ActiveRecord::Migration
  def self.up
    create_table :photos do |t|
      t.references :gallery
      t.string :title
    end

    add_index :photos, :gallery_id, :unique => false
  end

  def self.down
    drop_table :photos
  end
end
