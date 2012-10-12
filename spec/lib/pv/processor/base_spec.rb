require "spec_helper"

describe Pv::Processor::Base do
  describe "polling imap inboxes" do
    before do
      @imap_address = FactoryGirl.create(:imap_address)
    end

    it "should start polling existing inboxes on start" do
      processor = Pv::Processor::Base.new()
      poller = double(Pv::Processor::ClientPoller)
      poller.should_receive(:on_logout)
      processor.should_receive(:trigger_client_poller) { poller}
      processor.start_imap_processor()

      processor.emails_under_processing.should_not be_empty
      processor.emails_under_processing[@imap_address.email].should == @imap_address
    end
  end
end
