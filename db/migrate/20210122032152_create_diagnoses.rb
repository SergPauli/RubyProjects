class CreateDiagnoses < ActiveRecord::Migration[6.0]
  def change
    create_table :diagnoses, :id => false do |t|
      t.primary_key :id, :limit => 4
      t.string :klass, :limit => 2
      t.string :gruppa, :limit => 2      
      t.string :rubrica, :limit => 2
      t.string :podrubrica, :limit => 2
      t.string :code, :limit => 10
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
