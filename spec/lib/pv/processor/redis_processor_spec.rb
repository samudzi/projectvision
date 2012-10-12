require "spec_helper"

describe Pv::Processor::RedisProcessor do
  describe "fetching new messages" do
    before do
      @imap_address = FactoryGirl.create(:imap_address)
    end
    it "should be able to fetch new incoming imap requests" do
      Pv.imap_poller.new_imap_request(@imap_address)

      redis_processor = Pv::Processor::RedisProcessor.new()
      message = redis_processor.check_for_messages()
      message.should be_kind_of(Pv::Processor::NewImap)
    end

    it "should be able to fetch new imap poll request" do
      Pv.imap_poller.trigger_poll(@imap_address)

      redis_processor = Pv::Processor::RedisProcessor.new()
      message = redis_processor.check_for_messages()
      message.should be_kind_of(Pv::Processor::PollInbox)
    end
  end
end
