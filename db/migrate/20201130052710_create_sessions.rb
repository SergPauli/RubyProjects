class CreateSessions < ActiveRecord::Migration[6.0]
  def change
    create_table :sessions do |t|
      t.string :token      
      t.references :user

      t.timestamps
    end    
    add_index :sessions, :token
  end
end
