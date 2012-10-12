module Pv
  module Processor
    class Message
      attr_accessor :request_type, :json_object

      def self.parse(json_object)
        request_type = json_object[:request_type]
        klass = Pv::Processor.const_get(request_type.classify)
        klass.new(json_object)
      end
    end

    class NewImap < Message
      attr_accessor :server, :port, :ssl, :email, :password

      def initialize(json_object)
        @request_type = json_object[:request_type]
        @server = json_object[:server]
        @port = json_object[:port]
        @ssl = json_object[:ssl]
        @email = json_object[:email]
        @password = json_object[:password]
      end

      def trigger_processor_action(processor)
        imap_address = ImapAddress.find_by_email(email)
        processor.start_polling(imap_address)
      end
    end

    class PollInbox < Message
      attr_accessor :email
      def initialize(json_object)
        @request_type = json_object[:request_type]
        @email = json_object[:email]
      end

      def trigger_processor_action(processor)
        processor.trigger_poll(email)
      end

    end
  end
end
