class Album < ApplicationRecord
	has_attached_file :coverimage, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
	validates_attachment_content_type :coverimage, content_type: /\Aimage\/.*\z/
	has_many :photos
end
