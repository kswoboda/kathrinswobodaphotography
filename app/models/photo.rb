class Photo < ApplicationRecord
	has_attached_file :picture, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
	validates_attachment_content_type :picture, content_type: /\Aimage\/.*\z/

	belongs_to :album
	
	def url
		picture.url
	end
end
