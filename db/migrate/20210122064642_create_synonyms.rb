class CreateSynonyms < ActiveRecord::Migration[6.0]
  def change
    create_table :synonyms, :id => false do |t|
      t.primary_key :id,  :limit => 4
      t.string :name
      t.references :diagnosis

      t.timestamps
    end
  end
end
