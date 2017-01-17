Rails.application.routes.draw do
  get 'scores/create'

  get 'scores/index'

  root 'tags#index'

  resources :tags , only: [:index, :create, :destroy]
  resources :scores , only: [:index, :create]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
