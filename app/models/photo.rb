class Photo < ActiveRecord::Base

  has_attached_file :image,
                    :styles => { :large   => "640x480>",
                    :gallery => "200x200#" }

  belongs_to :gallery

  def as_json(options={})
    hash = super(options)
    hash['photo'].merge!(
                        'image_gallery_url' => image.url(:gallery),
                        'image_large_url' => image.url(:large),
                        'image_original_url' => image.url(:original)
                        )
    hash
  end
  
end
