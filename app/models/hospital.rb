class Hospital < ApplicationRecord
    has_many :users
    validates :name, length: { in: 6..100, message: "%{value} is not a valid (> 6 and < 100)"  }
    validates :code, length: { is: 6, message: "%{value} length <> 6" }
    validates :shortname, length: { in: 2..50, message: "%{value} is not a valid (> 2 and < 50)" }
    def as_json(options={})
        super(include: :users)
    end
end
