class CreateRegions < ActiveRecord::Migration[6.0]
  def change
    create_table :regions, :id => false do |t|
      t.primary_key :id,  :limit => 2 
      t.string :SUBJECT
      t.string :CODE_OKATO, :limit => 3
      t.string :STATUS
      t.string :OKATO_5, :limit => 10
      t.string :CODE_FNS, :limit => 2
      t.integer :FED, :limit => 2

      t.timestamps
    end
  end
end
