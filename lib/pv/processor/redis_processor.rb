module Pv
  module Processor
    class RedisProcessor
      def redis_connection
        Redis.new(Pv.config.redis_connection_option)
      end

      def check_for_messages
        Pv::Processor.debug("Checking redis queue for incoming messages")
        message = fetch_from_redis
        if message
          json_object = parse_json_string(message)
          if json_object
            Pv::Processor.info("Found a message of type #{json_object['request_type']}")
            Pv::Processor::Message.parse(json_object)
          else
            Pv::Processor.error("Error parsing incoming json message from redis")
          end
        else
          Pv::Processor.error("Error connecting to redis")
        end
      end

      def parse_json_string(message)
        ActiveSupport::JSON.decode(message)
      rescue
        nil
      end

      def fetch_from_redis
        redis_connection.rpop Pv.config.redis_list_name
      rescue
        nil
      end

    end

  end
end
