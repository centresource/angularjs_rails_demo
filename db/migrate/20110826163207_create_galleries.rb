class CreateGalleries < ActiveRecord::Migration
  def self.up
    create_table :galleries do |t|
      t.references :photographer
      t.string :title
    end

    add_index :galleries, :photographer_id, :unique => false
  end

  def self.down
    drop_table :galleries
  end
end
