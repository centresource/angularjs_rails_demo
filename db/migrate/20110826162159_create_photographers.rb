class CreatePhotographers < ActiveRecord::Migration
  def self.up
    create_table :photographers do |t|
      t.string :name
    end
  end

  def self.down
    drop_table :photographers
  end
end
