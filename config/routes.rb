Rails.application.routes.draw do
  resource :session, only: [:new, :create, :destroy]
	resources :users, only: [:new, :create]

	namespace :api, defaults: { format: :json } do
		resources :genres, only: [:show, :index, :create, :destroy]
		resources :ads, only: [:show, :index, :create, :destroy]
	end

	root to: "static_pages#root"
  get '*unmatched_route', to: 'static_pages#root'
end
