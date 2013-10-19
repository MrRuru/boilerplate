ENV['RACK_ENV'] = ENV['APP_ENV'] ||= "development"
ENV['APP_ROOT'] = File.expand_path('../..', __FILE__)


# Require dependencies
require 'rubygems'
require 'bundler'

Bundler.setup
Bundler.require(:default, ENV["RACK_ENV"].to_sym)


# Load env from .env if development(automatic in production because of foreman)
if ENV['RACK_ENV'] == 'development'
  require 'dotenv'
  Dotenv.load
end


# Load paths
$LOAD_PATH.unshift File.join(ENV['APP_ROOT'])

Dir[ENV['APP_ROOT'] + '/config/initializers/*.rb'].each do |file|
  require file
end


# Other conf
Encoding.default_external = 'utf-8'

# if ENV['RACK_ENV'] == 'development' || ENV['RACK_ENV'] == 'test'
#   require 'debugger'
# end