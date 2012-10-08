module Pv
  module WorkerClient
    class Message
      attr_accessor :request_type, :options
      def to_json
        options.merge(request_type: request_type).to_json
      end
    end

    class NewImapMessage < Message
      def initialize(imap_address)
        @request_type = "new_imap"
        @options = {
          server: imap_address.server,
          port: imap_address.port,
          ssl: imap_address.ssl,
          email: imap_address.email,
          password: imap_address.plain_password
        }
      end
    end

    class PollInbox < Message

    end
  end
end