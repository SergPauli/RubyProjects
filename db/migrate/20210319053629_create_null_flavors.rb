class CreateNullFlavors < ActiveRecord::Migration[6.0]
  def change
    create_table :null_flavors, :id => false do |t|
      t.primary_key :id,  :limit => 2      
      t.string :CODE,  :limit => 5
      t.string :NAME,  :limit => 100
      t.text :DESCRIPTION
      t.integer :ORDER,  :limit => 2
    end
  end
end
