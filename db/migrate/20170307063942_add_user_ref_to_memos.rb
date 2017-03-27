class AddUserRefToMemos < ActiveRecord::Migration
  def change
    add_reference :memos, :user, index: true
    add_foreign_key :memos, :users
  end
end
