module Api
  module Configuration

    def self.included(base)

      base.configure do |config|

        config.set :public_folder, 'public'

      end

    end

  end
end