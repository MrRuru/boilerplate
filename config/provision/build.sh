apt-get update

# nginx
apt-get -y install nginx

# ruby 2.0
apt-get -y install build-essential zlib1g-dev libssl-dev libreadline6-dev libyaml-dev
cd /tmp
wget http://ftp.ruby-lang.org/pub/ruby/2.0/ruby-2.0.0-p0.tar.gz
tar -xvzf ruby-2.0.0-p0.tar.gz
cd ruby-2.0.0-p0/
./configure --prefix=/usr/local
make
make install

# app
cd /vagrant
gem install bundler
bundle install --without development test

# configure the server
cp config/provision/nginx-default /etc/nginx/sites-available/default 

# run the app
APP_ENV=production bundle exec foreman start
/etc/init.d/nginx restart


# Build the server



# # apt-get install libssl-dev -y

# su ubuntu 
# cd /vagrant

# # # Install rbenv
# # git clone https://github.com/sstephenson/rbenv.git ~/.rbenv
# # git clone https://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build
# # echo 'export PATH="$HOME/.rbenv/bin:$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
# # echo 'eval "$(rbenv init -)"' >> ~/.bashrc
# # source ~/.bashrc

# # # Install ruby 2.0.0 (libssl needed)
# # apt-get install libssl-dev -y
# # rbenv-install 2.0.0-p247
# rbenv global 2.0.0-p247

# # # Bundle the gems
# # gem install bundler
# # rbenv rehash

# bundle install --without development test

# # Runs the app
# APP_ENV=production bundle exec foreman start
