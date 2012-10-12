module Pv
  module Processor
    class RedisProcessor
      def redis_connection
        Redis.new(Pv.config.redis_connection_option)
      end

      def check_for_messages
        message = redis_connection.rpop Pv.config.redis_list_name
        if message
          json_object = ActiveSupport::JSON.decode(message)
          message = Pv::Processor::Message.parse(json_object)
          process_parsed_mesage(message)
        end
      end
    end

  end
end
