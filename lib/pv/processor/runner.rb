module Pv
  module Processor
    class Runner
      def self.run
        @processor = Pv::Processor::Base.new()
        @processor.start_imap_processor()

        @redis_processor = Pv::Processor::RedisProcessor.new()
        EM.add_periodic_timer(Pv.config.processor.redis_poll_interval) {
          process_parsed_mesage(@redis_processor.check_for_messages())
        }
      end

      def self.process_parsed_mesage(message)
        return unless message
        message.trigger_processor_action(@processor)
      end

    end
  end
end
