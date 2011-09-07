class MyUsersController < ApplicationController
 before_filter :is_admin?
  def index
    @users = User.all   
    render :json =>  {:data => @users.collect{|u| u.attributes}, :success => true, :totalRows => @users.count }.to_json
  end
  
  
  def create
    if params[:user]
      @user = User.new params[:user]
    else
      @user = User.new params
    end
    if @user.save
      render :json => {
          :notice => 'Saved',
          :success => true,
          :data => @user.id
      }
    else
      render :json => { :success => false }
    end
  end

  def show
    @user = User.find(params[:id])
    render :json => {:data => @user.attributes, :success => true}
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes params[:user]
      render :json => { :success => true}
    else
      render :json => { :success => false}
    end
  end

  def destroy
    @user = User.find(params[:id])
    if @user.destroy
      render :json => { :success => true }
    else
      render :json => { :success => false }
    end
  end
  
end
