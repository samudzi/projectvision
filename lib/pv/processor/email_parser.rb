require "mail"

module Pv
  module Processor
    class EmailParser
      def initialize(raw_imap_email,imap_address)
        @mail = parse_email(raw_imap_email)
        @imap_address = imap_address
      end

      def save
        if @mail
          thought = Thought.new()
          thought.brief = @mail.subject
          thought.detail = @mail.text_part.body
          thought.user = imap_address.user
          thought.save
        end
      end

      def parse_email(raw_imap_email)
        Mail.read_from_string(raw_imap_email.attr["RFC822"])
      rescue
        nil
      end

    end
  end
end
