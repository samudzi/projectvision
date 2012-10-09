require File.expand_path("../../config/environment", __FILE__)

require 'em-imap'
require "mail"
require "time"

class ImapPoller
  attr_accessor :client
  def fetch_new_email
    old_date = 2.hours.ago.rfc2822

    # client.uid_search("UID", 35103..-1).bind! do |results|
    #  p results.size
    #  binding.pry()

    client.uid_fetch(53251..-1,"RFC822").callback do |emails|
      puts "Some results are here"
      binding.pry()
    end
  end

  def fetch_by_date
    yesterday = 1.day.ago
    client.uid_search("SINCE",yesterday.strftime("%-d-%b-%Y")).bind! do |results|
      puts "results is of size #{results.size}"
      client.uid_fetch(results,"RFC822")
    end.callback do |emails|
      binding.pry
    end
  end

  def run
    EM::run do
      @client = EM::IMAP.new('imap.gmail.com', 993, true)

      client.connect.bind! do
        client.login("hemant@codemancers.com", ENV["GMAIL_PASSWORD"])
      end.bind! do
        client.list
      end.bind! do |results|
        puts results
      end.bind! do
        client.examine("INBOX")
      end.bind! do
        fetch_new_email
      end.errback do |error|
        puts "Connecting or logging in failed: #{error}"
      end
    end
  end

end

ImapPoller.new.run()