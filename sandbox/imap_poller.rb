require File.expand_path("../../config/environment",__FILE__)

require 'em-imap'

EM::run do
  client = EM::IMAP.new('imap.gmail.com', 993, true)

  client.connect.bind! do
    client.login("hemant@codemancers.com", ENV["GMAIL_PASSWORD"])
  end.callback do
    puts "Connected and logged in!"
  end.errback do |error|
    puts "Connecting or logging in failed: #{error}"
  end.bothback do

  end
end

