class AddNameToUsers < ActiveRecord::Migration[5.1]
  def change
  	change_table :users do |t|
  	  t.string :first
  	  t.string :last

  	end
  end
end
