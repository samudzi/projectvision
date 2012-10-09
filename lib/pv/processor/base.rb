module Pv
  module Processor
    class Base
      def start_polling(imap_address)
        poller = Pv::Processor::ClientPoller.new(imap_address)
        poller.logout { renew_polling(imap_address) }
      end

      def renew_polling(imap_address)
        EM.add_timer(Pv.config.polling_interval) {
          imap_address.reload
          start_polling(imap_address)
        }
      end
    end
  end
end