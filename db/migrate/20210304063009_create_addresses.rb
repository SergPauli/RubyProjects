class CreateAddresses < ActiveRecord::Migration[6.0]
  def change
    create_table :addresses do |t|            
      t.integer  :state, :limit => 1
      t.string :region
      t.string :district  
      t.string :city
      t.string :street 
      t.string :building, :limit => 10
      t.string :flat, :limit => 10
      t.string :section, :limit => 3   
      t.string :aoguid, :limit => 36     
      t.string :houseguid, :limit => 36
      t.string :zipcode
      t.boolean :isvilage    

      t.timestamps
    end
  end
end
