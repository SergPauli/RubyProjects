class Diagnosis < ApplicationRecord
    has_many :synonyms
    validates :klass, presence: true, length: { is: 2, message: "%{value} need length = 2" }
    validates :gruppa, length: { is: 2, message: "%{value} need length = 2" }
    validates :rubrica, length: { is: 2, message: "%{value} need length = 2" }
    validates :podrubrica, length: { is: 2, message: "%{value} need length = 2" }
    validates :code, length: { in: 2..10, message: "%{value} need 2 < length < 11 " }
    validates :name, presence: true
end
