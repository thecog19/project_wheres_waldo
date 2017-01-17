Rails.application.routes.draw do
  root to: 'tags#index'
  
  get 'tags/index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
