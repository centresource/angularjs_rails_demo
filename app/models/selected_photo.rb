class SelectedPhoto < ActiveRecord::Base

  attr_accessible :title,
                  :photo_id,
                  :photo

  belongs_to :photo

  def as_json(options={})
    hash = super(options)
    hash.merge!(
                'image_gallery_url' => photo.image.url(:gallery),
                'image_large_url' => photo.image.url(:large),
                'image_original_url' => photo.image.url(:original)
                )
    hash
  end

end
