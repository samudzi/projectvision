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
          Pv::Processor.info("Successfully logged into inbox with email #{imap_address.email}")
          client.examine("INBOX")
        end.callback do
          fetch_new_email
        end.errback do |error|
          Pv::Processor.error("Error polling imap inbox with address #{imap_address.email}")
          imap_address.log_status("Error - #{error.inspect}","error")
        end
      end

      def on_logout(&block)
        @logout_block = block
      end

      def fetch_new_email
        Pv::Processor.debug("Trying to fetch new emails for inbox #{imap_address.email}")
        imap_address.last_uid ? fetch_new_email_by_uuid() : fetch_new_email_by_date
      end

      def fetch_new_email_by_uuid
        client.uid_search("UID", imap_address.last_uid..-1).callback do |results|
          if results.size > 100
            fetch_new_email_by_date
          else
            fetch_emails_by_uuid_range(results)
          end
        end.errback do |error|
          Pv::Processor.error("Fetching emails by uid failed for inbox #{imap_address.email}")
          imap_address.log_status("Error performing uid based search on INBOX. #{error.inspect}","error")
        end
      end

      def fetch_emails_by_uuid_range(results)
        client.uid_fetch(results,"RFC822").callback do |emails|
          process_incoming_emails(emails)
        end.errback do |error|
          imap_address.log_status("Error fetching emails by uid range. #{error.inspect}","error")
        end
      end

      def fetch_new_email_by_date
        yesterday = 1.day.ago
        client.uid_search("SINCE", yesterday.strftime("%-d-%b-%Y")).bind! do |results|
          if results.size > 100
            fetch_last_50_emails(results)
          else
            client.uid_fetch(results, "RFC822")
          end
        end.callback do |emails|
          process_incoming_emails(emails)
        end.errback do |error|
          imap_address.log_status("Error fetching based on date.#{error.inspect}",'error')
        end
      end

      def fetch_last_50_emails(results)
        uid_array = results.sort.last(50)
        client.uid_fetch(uid_array,"RFC822")
      end

      def process_incoming_emails(emails)
        emails.each { |email| save_incoming_email(email) }
        max_uid = emails.map {|email| email.attr["UID"]}.max
        update_imap_address(max_uid)
        Pv::Processor.info("Successfully created #{emails.size} thoughts")
        imap_address.log_status("Successfully created #{emails.size} thoughts", "ok")
      end

      def save_incoming_email(email)
        Pv::Processor::EmailParser.new(email,imap_address).save
      rescue Exception => e
        Pv::Processor.error("Error saving email from #{imap_address.email} with error #{e.inspect}")
      end

      def update_imap_address(max_uid)
        imap_address.last_uid = max_uid
        imap_address.save!
      end

      def close_current_connection
        client.logout()
        @logout_block && @logout_block.call()
      end

    end
  end
end
