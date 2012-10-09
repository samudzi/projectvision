require "mail"

module Pv
  module Processor
    class EmailParser
      def initialize(raw_imap_email,imap_address)
        @imap_uid = raw_imap_email.attr["UID"]
        @mail = parse_email(raw_imap_email)
        @imap_address = imap_address
        @user = @imap_address.user
      end

      def save
        if @mail
          old_thought = @user.thoughts.find_by_imap_uid(@imap_uid)
          return false if old_thought
          store_thought
        else
          false
        end
      end

      def store_thought
        thought = Thought.new()
        thought.brief = @mail.subject
        thought.detail = @mail.text_part.body
        thought.user = @user
        thought.save
      end

      def parse_email(raw_imap_email)
        Mail.read_from_string(raw_imap_email.attr["RFC822"])
      rescue
        nil
      end

    end
  end
end
