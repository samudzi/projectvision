module Pv
  module WorkerClient
    class Client
      def new_imap_request(imap_options)

      end

      def redis_connection
        Redis.new(Pv.config.redis_connection_option)
      end
    end
  end
end
