module Pv
  module WorkerClient
    class Client
      def new_imap_request(imap_address)
        return false unless imap_address
        imap_message = Pv::WorkerClient::NewImapMessage.new(imap_address)
        send_to_redis(imap_message.to_json)
        true
      end

      def trigger_poll(imap_address)
        return false unless imap_address
        imap_message = Pv::WorkerClient::PollInbox.new(imap_address)
        send_to_redis(imap_message.to_json)
        true
      end

      def send_to_redis(message)
        redis_connection.rpush Pv.config.redis_list_name, message
      rescue
        Rails.logger.fatal("Error writing to redis")
      end

      def redis_connection
        Redis.new(Pv.config.redis_connection_option)
      end
    end
  end
end

