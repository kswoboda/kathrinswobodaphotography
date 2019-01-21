require 'test_helper'

class StaticPagesControllerTest < ActionDispatch::IntegrationTest
  test "should get awards" do
    get static_pages_awards_url
    assert_response :success
  end

  test "should get contact" do
    get static_pages_contact_url
    assert_response :success
  end

end
