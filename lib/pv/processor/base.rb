module Pv
  module Processor
    class Base
      attr_accessor :emails_under_processing

      def initialize
        @emails_under_processing = {}
      end

      def start_imap_processor
        ImapAddress.all.each do |imap_address|
          start_polling(imap_address)
        end
      end

      def trigger_poll(email_address)
        if imap_address = @emails_under_processing[email_address]
          start_polling(imap_address,false)
        end
      end

      def start_polling(imap_address,renew = true)
        return if @emails_under_processing[imap_address.email]

        poller = Pv::Processor::ClientPoller.new(imap_address)
        if renew
          @emails_under_processing[imap_address.email] = imap_address
          poller.on_logout { renew_polling(imap_address) }
        end
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
