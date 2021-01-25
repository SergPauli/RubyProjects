class CreateH1s < ActiveRecord::Migration[6.0]
  def change
    create_table :h1s, :id => false do |t|
      t.primary_key :code,  :limit => 1
      t.string :name

      t.timestamps
    end
  end
end

