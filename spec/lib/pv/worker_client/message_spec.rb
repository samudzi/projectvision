require "spec_helper"

describe Pv::WorkerClient::Message do
  describe "Serializing new imap address request" do
    it "should correctly serialize new imap request" do
      imap_address = FactoryGirl.create(:imap_address)
      message = Pv::WorkerClient::NewImapMessage.new(imap_address)
      json_data = message.to_json
      json_data.should_not be_empty
    end
  end
end
