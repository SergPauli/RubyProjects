class AddParentToNullFlavors < ActiveRecord::Migration[6.0]
  def change
    add_column :null_flavors, :PARENT_ID, :integer, :limit => 2, null: true, index: true
    add_foreign_key :null_flavors, :null_flavors, column: :PARENT_ID
  end
end
