# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_04_20_133527) do

  create_table "addresses", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "state", limit: 1
    t.string "region"
    t.string "district"
    t.string "city"
    t.string "street"
    t.string "building", limit: 10
    t.string "flat", limit: 10
    t.string "section", limit: 3
    t.string "aoguid", limit: 36
    t.string "houseguid", limit: 36
    t.string "zipcode"
    t.boolean "isvilage"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "diagnoses", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "klass", limit: 2
    t.string "gruppa", limit: 2
    t.string "rubrica", limit: 2
    t.string "podrubrica", limit: 2
    t.string "code", limit: 10
    t.string "name"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "h1s", primary_key: "code", id: :integer, limit: 1, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "hospitals", id: :integer, limit: 1, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "code", limit: 6, null: false
    t.string "name", limit: 100, null: false
    t.string "shortname", limit: 50, null: false
    t.string "address"
    t.string "boss", limit: 100
    t.string "po_code", limit: 45
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["code"], name: "index_hospitals_on_code", unique: true
  end

  create_table "nomenclatures", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "oid"
    t.string "version"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "null_flavors", id: :integer, limit: 2, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "CODE", limit: 5
    t.string "NAME", limit: 100
    t.text "DESCRIPTION"
    t.integer "ORDER", limit: 2
    t.integer "PARENT_ID", limit: 2
    t.index ["PARENT_ID"], name: "fk_rails_b3aca66fa1"
  end

  create_table "regions", id: :integer, limit: 2, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "SUBJECT"
    t.string "CODE_OKATO", limit: 3
    t.string "STATUS"
    t.string "OKATO_5", limit: 10
    t.string "CODE_FNS", limit: 2
    t.integer "FED", limit: 2
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "synonyms", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.bigint "diagnosis_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["diagnosis_id"], name: "index_synonyms_on_diagnosis_id"
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name", limit: 100
    t.string "username", limit: 100, null: false
    t.string "email", limit: 70
    t.string "password_digest"
    t.bigint "hospital_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["hospital_id"], name: "index_users_on_hospital_id"
  end

  add_foreign_key "null_flavors", "null_flavors", column: "PARENT_ID"
end
