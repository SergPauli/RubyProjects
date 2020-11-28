class CreateHospitals < ActiveRecord::Migration[6.0]
  def change
    create_table :hospitals, :id => false do |t|
      t.primary_key :id,  :limit => 1
      t.string :code, null: false, :limit => 6
      t.string :name, null: false, :limit => 100
      t.string :shortname, null: false, :limit => 50
      t.string :address
      t.string :boss, :limit => 100
      t.string :po_code, :limit => 45

      t.timestamps
    end
    add_index :hospitals, :code, unique: true
  end
end
