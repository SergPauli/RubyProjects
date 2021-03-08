Rails.application.routes.draw do  
  namespace :v1 do
    resources :hospitals
  end
  scope '/v1/kladr', controller: 'v1/kladr' do
    post '/', action: 'index'    
  end
  scope 'v1/universal_api/:model_name', controller: 'v1/universal_api' do
    get '/', action: 'index'
    get '/:id', action: 'show'
    post '/', action: 'create'
    put '/:id', action: 'update'
    delete '/:id', action: 'destroy'
  end

  resources :users, param: :_username
  post '/auth/login', to: 'authentication#login'
  get '/auth/logout', to: 'authentication#logout'
  get '/*a', to: 'application#not_found'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
