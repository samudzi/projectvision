module Pv
  class Config
    include Singleton

    def initialize
      configure_configatron
    end

    def method_missing(method, *args, &block)
      configatron.send(method, *args, &block)
    end

    def redis_connection_option
      {
        host: ENV['REDIS_HOST'] || "localhost",
        port: ENV['REDIS_PORT'] || 6379
      }
    end

    private
    def configure_configatron
      yaml_data = YAML.load_file("#{Rails.root}/config/config.yml")[Rails.env]
      configatron.configure_from_hash(yaml_data)
    end
  end

  def self.load_config
    @@pv_config = Pv::Config.instance
  end

  def self.config
    @@pv_config
  end
end
