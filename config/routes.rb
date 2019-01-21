Rails.application.routes.draw do
  get 'users/new'

  resources :users
  resources :albums
  resources :photos
  root 'albums#index'

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  get '/signup' => 'users#new'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
