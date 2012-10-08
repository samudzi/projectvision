module Pv
  module WorkerClient
    class Client
      def new_imap_request(imap_address)
        imap_message = Pv::WorkerClient::NewImapMessage.new(imap_address)
        redis_connection.rpush Pv.config.redis_list_name,imap_message.to_json
        true
      end

      def redis_connection
        Redis.new(Pv.config.redis_connection_option)
      end
    end
  end
end

