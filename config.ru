require './config/environment'
require 'api/base'
require 'api/websocket'

urlmap = {
  "/api/v1" => Api::Base.new,
  "/ws"     => Api::Websocket.new  
}

# Serve static files in dev
if ENV['RACK_ENV'] == 'development'
  urlmap["/"] = Rack::Static.new(nil, :urls => ["/", "/components"], :root => "app")
end  


run Rack::URLMap.new urlmap
