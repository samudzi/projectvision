require 'spec_helper'

describe ImapAddressesController do
  describe "Listing imap addresses for the user" do
    before(:each) do
      @user = FactoryGirl.create(:user)
      @imap_address = FactoryGirl.create(:imap_address, user: @user)
      sign_in @user
    end

    it "should allow listing of imap addresses" do
      get :index, format: :json
      response.should be_success
      response.should include_hash_with_key("email", @imap_address.email)
      response.should include_hash_with_key("user_id", @user.id)
    end
  end

  describe "creating new imap address" do
    before do
      @user = FactoryGirl.create(:user)
      sign_in @user
    end

    it "should allow creating new imap address" do
      imap_attributes = FactoryGirl.attributes_for(:imap_address)
      post :create, imap_address: imap_attributes, format: :json

      response.status.should == 201
      response.should contain("email", imap_attributes['email'])
      response.should contain("user_id", @user.id)
    end

    it "should throw error when creating new record" do
      imap_address = FactoryGirl.create(:imap_address, email: "hemant2@example.com")
      imap_attributes = FactoryGirl.attributes_for(:imap_address, email: "hemant2@example.com")

      post :create, imap_address: imap_attributes, format: :json
      response.status.should == 422
    end
  end

  describe "updating the imap address" do
    before do
      @user = FactoryGirl.create(:user)
      @imap_address = FactoryGirl.create(:imap_address, user: @user)
      sign_in(@user)
    end

    it "should allow updating of an imap address" do
      put "update", id: @imap_address.id, imap_address: { email: 'hemant@codemancers.com'}, format: :json
      response.should be_success
      response.should contain('email','hemant@codemancers.com')
    end

    it "should throw error if error updating a record" do
      another_imap_address = FactoryGirl.create(:imap_address, email: "hemant2@example.com")
      put "update", id: @imap_address.id, imap_address: { email: "hemant2@example.com"}, format: :json
      response.status.should == 422
    end
  end
end
