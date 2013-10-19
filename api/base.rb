require 'sinatra/base'
require 'sinatra/json'

require 'api/configuration'

module Api

  class Base < Sinatra::Base

    include Api::Configuration

    get '/' do
      json :hello => "world in #{ENV['RACK_ENV']}"
    end

  end

end