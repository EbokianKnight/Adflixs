source 'https://rubygems.org'

## Useful Docs
# [Paperclip](https://github.com/thoughtbot/paperclip#paperclip)
# [Figaro] (https://github.com/laserlemon/figaro#why-does-figaro-exist)
# [AWS] (http://aws.amazon.com/)
# [FileReader] (https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
# [FormData] (https://developer.mozilla.org/en-US/docs/Web/API/FormData)


ruby '2.2.3'
# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.5.1'
# Use postgresql as the database for Active Record
gem 'pg', '~> 0.15'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Use ActiveModel has_secure_password
gem 'bcrypt'

# Use Unicorn as the app server
# gem 'unicorn'
gem 'faker'
gem 'kaminari'
gem 'pg_search'
gem "paperclip", '5.0.0.beta1'
gem 'figaro'
gem 'aws-sdk', '>= 2.0'
gem 'omniauth-facebook'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'
	gem 'rspec-rails'
	gem 'capybara'
	gem 'launchy'
	gem 'factory_girl_rails'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'
	gem 'better_errors'
	gem 'binding_of_caller'
	gem 'pry-rails'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
end

group :production do
  gem 'newrelic_rpm'
  gem 'rails_12factor' # error feedback
end

# group :assets do
#   gem 'less'
# end
