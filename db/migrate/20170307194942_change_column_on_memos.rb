class ChangeColumnOnMemos < ActiveRecord::Migration
  def change
    change_column :memos, :priority, :integer, :null => true
  end
end
