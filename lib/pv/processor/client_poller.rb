module Pv
  module Processor
    class ClientPoller
      attr_accessor :client, :imap_address
      def initialize(imap_address)
        @imap_address = imap_address
        @client = EM::IMAP.new(imap_address.server, imap_address.port, imap_address.ssl)
        client.connect.bind! do
          client.login(imap_address.email, imap_address.plain_password)
        end.bind! do
          client.examine("INBOX")
        end.callback do
          fetch_new_email
        end.errback do |error|
          imap_address.log_status("Error connecting to Imap Server with provided credentials","error")
        end
      end

      def logout(&block)
        @logout_block = block
      end

      def fetch_new_email
        imap_address.last_uid ? fetch_new_email_by_uuid() : fetch_new_email_by_date
      end

      def fetch_new_email_by_uuid
        client.uid_search("UID", imap_address.last_uid..-1).callback do |results|
          if results.size > 200
            fetch_new_email_by_date
          else
            fetch_emails_by_uuid_range(results)
          end
        end.errback do |error|
          imap_address.log_status("Error performing uid based search on INBOX","error")
        end
      end

      def fetch_emails_by_uuid_range(results)
        client.uid_fetch(results,"RFC822").callback do |emails|
          emails.each {|email| Pv::Processor::EmailParser.new(email).save }
          @logout_block.call()
          imap_address.log_status("Successfully created #{emails.size} thoughts","ok")
        end.errback do |error|
          imap_address.log_status("Error fetching emails by uid range","error")
        end
      end

      def fetch_new_email_by_date

      end
    end
  end
end
