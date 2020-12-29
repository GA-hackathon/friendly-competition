class AddContestToSubmissions < ActiveRecord::Migration[6.0]
  def change
    add_reference :submissions, :contest, index: true
    # add_foreign_key :submissions, :contest
  end
end
