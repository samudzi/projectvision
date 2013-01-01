Pv::Application.routes.draw do

  devise_for :users, :controllers => { :sessions => "users/sessions", :omniauth_callbacks => "users/omniauth_callbacks"}
  match '/setup' => 'home#setup'
  root :to => "home#index"
  get "home/index"

  resources :catagories
  resources :thoughts
  resources :action_logs do
    collection do
      get 'recent_team_logs'
    end
  end
  resources :home

  resources :my_users do
    collection do
      post 'update_sync'
      get  'currentUser'
    end
  end

  resources :teams do
    collection do
      post 'add_user'
      post 'remove_user'
    end
    collection do
      get 'list'
      get 'admin_teams'
    end
  end

  resources :imap_addresses do
    get :trigger_poll, on: :member
    get :poll_all, on: :collection
  end

  match 'thoughts/update_status/:id' => 'thought#update_status'
  match 'home/login' => 'home#login'
end
