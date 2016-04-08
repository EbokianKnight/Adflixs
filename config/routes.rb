Rails.application.routes.draw do

	namespace :api, defaults: { format: :json } do
    resources :users, except: [:edit, :new]
		resources :genres, only: [:show, :index, :create, :destroy]
		resources :ads, only: [:show, :index, :create, :destroy]
    resource :session, only: [:show, :create, :destroy]
		resources :views, only: [:show, :create, :update]
		resources :favorites, only: [:index, :show, :create, :destroy]
		resources :features, only: [:index, :create, :destroy]
		get 'list', :to => 'genres#list'
	end

	get "auth/facebook/callback", to: "omniauth#facebook"

	root to: "static_pages#root"
  get '*unmatched_route', to: 'static_pages#root'
end
