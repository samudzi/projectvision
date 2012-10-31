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
        thought.imap_uid = @imap_uid
        thought.brief = @mail.subject
        thought.detail = mail_body
        thought.user = @user
        thought.save
      end

      def mail_body
        return @mail.html_part.body.to_s if @mail.html_part
        return @mail.text_part.body.to_s if @mail.text_part
        @mail.body.to_s
      end

      def parse_email(raw_imap_email)
        Mail.read_from_string(raw_imap_email.attr["RFC822"])
      rescue
        nil
      end

    end
  end
end
