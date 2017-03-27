Rails.application.routes.draw do
  get '/' => 'register#index'

  post '/register' => 'register#register'

  post '/reg' => 'register#reg'

  post '/login' => 'login#create'

  get '/memos' => 'memos#new'

  post '/memos/create' => 'memos#create'

  post '/edit/:id' => 'memos#edit'

  delete '/memo/:id' => 'memos#delete'

  post '/memo/:id' => 'memos#priority'

  delete '/logout' => 'login#destroy'

  get '/login' => 'login#partialL'

  get '/register' => 'register#partialR'

end
