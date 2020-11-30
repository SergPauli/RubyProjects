class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name, :limit => 100
      t.string :username, null: false, :limit => 100
      t.string :email, :limit => 70
      t.string :password_digest, :limit => 45
      t.references :hospital

      t.timestamps
    end          
  end
end
