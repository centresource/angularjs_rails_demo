class Gallery < ActiveRecord::Base

  belongs_to :photographer
  has_many :photos
  
end
