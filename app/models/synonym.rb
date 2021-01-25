class Synonym < ApplicationRecord
  belongs_to :diagnosis  
  validates :diagnosis, presence: true
  validates :name, presence: true  
end
