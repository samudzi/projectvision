$: << File.dirname(__FILE__)

require "eventmachine"

require "processor/email_parser"
require "processor/base"
require "processor/runner"
require "processor/message"
require "processor/client_poller"
require "processor/redis_processor"


module Pv
  module Processor
    class << self
      [:debug,:info,:error,:fatal].each do |method_name|

        class_eval <<-RUBY_METHOD, __FILE__, __LINE__+1
          def #{method_name}(message)
            if defined?(Raad)
              Raad::Logger.#{method_name}(message)
            else
              puts message
            end
          end
        RUBY_METHOD

      end
    end
  end
end


