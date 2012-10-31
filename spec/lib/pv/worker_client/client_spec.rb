require "spec_helper"

describe Pv::WorkerClient::Client do
  it "should allow me to write any message to redis queue" do
    client = Pv::WorkerClient::Client.new()
    imap_request = FactoryGirl.create(:imap_address)
    client.new_imap_request(imap_request).should be_true

    message = client.redis_connection.rpop(Pv.config.redis_list_name)
    message.should match(/imap.gmail.com/)
  end

  it "should allow me to request a inbox poll on demand" do

  end
end
