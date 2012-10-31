module Pv
  module Processor
    class Base
      attr_accessor :emails_under_processing

      def initialize
        @emails_under_processing = {}
      end

      def start_imap_processor
        Pv::Processor.debug("Starting imap procesor")
        ImapAddress.all.each do |imap_address|
          Pv::Processor.info("Add #{imap_address.email} to list of monitored imap servers")
          start_polling(imap_address)
        end
      end

      def trigger_poll(email_address)
        if imap_address = @emails_under_processing[email_address]
          start_polling(imap_address,false)
        end
      end

      def add_to_email_polling(imap_address)
        return if @emails_under_processing[imap_address.email]
        start_polling(imap_address)
      end

      def start_polling(imap_address,renew = true)
        poller = trigger_client_poller(imap_address)
        if renew
          @emails_under_processing[imap_address.email] = imap_address
          poller.on_logout { renew_polling(imap_address) }
        end
      end

      def trigger_client_poller(imap_address)
        Pv::Processor::ClientPoller.new(imap_address)
      end

      def renew_polling(imap_address)
        EM.add_timer(Pv.config.processor.imap_poll_interval) {
          imap_address.reload
          start_polling(imap_address)
        }
      end
    end
  end
end
