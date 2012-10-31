require 'spec_helper'

describe ImapAddress do
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:server) }
  it { should validate_presence_of(:port) }
  it { should validate_presence_of(:ssl) }
  subject { FactoryGirl.create(:imap_address) }
  it { should validate_uniqueness_of(:email) }

  describe "encrypt" do
    it "should encrypt passwords before saving" do
      imap_address = FactoryGirl.build(:imap_address)
      imap_address.save.should be_true
      imap_address.reload
      imap_address.password.should_not == "password"
      imap_address.plain_password.should == "password"
    end
  end
end
