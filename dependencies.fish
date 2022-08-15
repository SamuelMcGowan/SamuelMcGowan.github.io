sudo apt-get install ruby-full build-essential zlib1g-dev

set -Ux GEM_HOME ~/gems
fish_add_path ~/gems/bin

gem install jekyll bundler
bundle install
