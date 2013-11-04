require 'rack/websocket'
require 'api/models/bet'

module Api

  class Websocket < Rack::WebSocket::Application

    BETS = {}

    def initialize
    end


    # Client connect / disconnect and bet creation / removal
    def on_open(env)
      puts "Client connected"
      get_ws_data!(env)      

      msg = @bet.add_user(@user_id)

      send_data "Bet response on connect : #{msg}"
    end

    def on_close(env)
      puts "Client disconnected"
      get_ws_data!(env)

      msg = @bet.remove_user(@user_id)

      send_data "Bet response on disconnect : #{msg}"
    end


    # Handle win-lose message
    def on_message(env, msg)
      puts "Got message : #{msg}"

      get_ws_data!(env)
      
      case msg
      when "win"
        @bet.set_winning(@user_id)
      when "lose"
        @bet.set_losing(@user_id)
      end

      res = @bet.status
      send_data "New bet status : #{res}"
    end


    private

    def get_ws_data!(env)
      @channel = env['REQUEST_PATH'][4..-1] # Remove the /ws from the url
      @user_id = env['HTTP_SEC_WEBSOCKET_KEY']
      @bet     = BETS[@channel] || Models::Bet.new.tap{|bet| BETS[@channel] = bet}
    end

  end

end

