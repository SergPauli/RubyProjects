class CreateNomenclatures < ActiveRecord::Migration[6.0]
  def change
    create_table :nomenclatures do |t|
      t.string :name
      t.string :oid
      t.string :version
      t.string :description

      t.timestamps
    end
  end
end
