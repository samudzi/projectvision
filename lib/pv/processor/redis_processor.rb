module Pv
  module Processor
    class RedisProcessor
      def redis_connection
        Redis.new(Pv.config.redis_connection_option)
      end

      def check_for_messages
        Pv::Processor.debug("Checking redis queue for incoming messages")
        message = redis_connection.rpop Pv.config.redis_list_name
        if message
          json_object = ActiveSupport::JSON.decode(message)
          Pv::Processor.info("Found a message of type #{json_object['request_type']}")
          Pv::Processor::Message.parse(json_object)
        end
      end
    end

  end
end
