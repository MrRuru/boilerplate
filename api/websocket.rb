require 'rack/websocket'

module Api

  class Websocket < Rack::WebSocket::Application

    def initialize

    end


    def on_open(env)
      puts "Client connected"
      send_data "hello"
    end    

    def on_close(env)
      puts "Client disconnected"
    end

    def on_message(env, msg)
      puts "Received message: " + msg
      send_data "got your message : #{msg}"
    end

  end

end

