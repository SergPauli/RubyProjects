require 'test_helper'

class V1::HospitalsControllerTest < ActionDispatch::IntegrationTest
  test "should get add" do
    get v1_hospitals_add_url
    assert_response :success
  end

  test "should get update" do
    get v1_hospitals_update_url
    assert_response :success
  end

  test "should get del" do
    get v1_hospitals_del_url
    assert_response :success
  end

end
