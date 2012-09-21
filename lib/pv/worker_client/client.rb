module Pv
  module WorkerClient
    class Client
      def redis_connection
        Redis.new(Pv.config.redis_conne)
      end
    end
  end
end
