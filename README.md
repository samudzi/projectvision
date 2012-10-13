# Installations and instructions for running the App #

## Requirements ##

* Ruby 1.9.3.
* A Redis Server.
* Mysql Server.

So before we start ensure application has accessing to running Redis Server
and Mysql Server.

## Configuration ##

* Install gem and dependencies with:

    bundle install
    
* Configure database and redis connections. Database connections
  can be configured using `config/database.yml` and redis connection
  can be configured using `config/config.yml`.
  
* Assuming `database.yml` points to accurate database configuration.
  we now need to migrate it, which can be done using:
  
    bundle exec rake db:migrate
    
  If you are running this in production environment, it should be run
  with:

    bundle exec rake db:migrate RAILS_ENV=production
    
  
## Start Imap processor script ##

The imap processor script can be started in foreground or background.

* To start the script in foreground:

    bundle exec script/imap_processor start -v
    
* In production deployments however the script should mostly be running
  in background and it can be started using:
  
    bundle exec script/imap_processor start -d
    
## Stopping the Imap Processor script ##

If the script was started in foreground, it can be simply be stopped
by pressing `Control-C`.

If it was started in background, it can be stopped using:

    bundle exec script/imap_processor stop
    
## Start the Rails Server ## 

The Rails Server in development mode can be started using:

    bundle exec rails s
    
Which will start rails server on port 3000.

