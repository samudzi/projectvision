source 'http://rubygems.org'

gem 'rails', '3.0.3'
gem 'rake', '0.8.7'

gem 'devise'
gem "oa-openid", :require => "omniauth/openid"
# Use unicorn as the web server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano'

# To use debugger (ruby-debug for Ruby 1.8.7+, ruby-debug19 for Ruby 1.9.2+)
# gem 'ruby-debug'
gem 'debugger'
gem 'attr_encrypted'
gem 'mail'
gem 'bcrypt-ruby','~> 3.0.0'

# Bundle the extra gems:
# gem 'bj'
# gem 'nokogiri'
# gem 'sqlite3-ruby', :require => 'sqlite3'
gem 'mysql2', '< 0.3'
gem "configatron"
# gem 'aws-s3', :require => 'aws/s3'

# Bundle gems for the local environment. Make sure to
# put test-only gems in this group so their generators
# and rake tasks are available in development mode:
# group :development, :test do
#   gem 'webrat'
# end

group :development do
  gem 'rspec-rails'
  gem 'pry-rails'
end


group :test do
  gem 'factory_girl_rails'
  gem 'shoulda-matchers'
  gem 'capybara'
  gem 'capybara-webkit'
  gem 'cucumber-rails', :require => false
  gem 'email_spec'
  gem 'launchy'
  gem 'headless'
  gem "ci_reporter"
  gem 'simplecov', :platform => :mri_19
  gem 'simplecov-rcov', :require => false
  gem 'database_cleaner'
end

