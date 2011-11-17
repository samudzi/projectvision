class CatagoriesController < ApplicationController

  def index 
    @catagory = Catagory.find(:all, :order=>"created_at")           
    render :json => {:data =>@catagory, :success =>true, :totalRows => @catagory.count}.to_json
  end
  def create
    if params[:name]
      @catagory = Catagory.new params
    else
      @catagory = Catagory.new params[:name]
    end
  
    if @catagory.save
      render :json => {
          :notice => 'Saved',
          :success => true,
          :data => @catagory.id
      }
    else
      render :json => { :success => false }
    end
  end

  def show
    @catagory = Catagory.find(params[:id])
    render :json => {:data => @catagory, :success => true}
  end

  def update    
    @catagory = Catagory.find(params[:id])       
    if @catagory.update_attributes params
      render :json => { :success => true}
    else
      render :json => { :success => false}
    end
  end

  def destroy  
    @catagory = Catagory.find(params[:id])    
    if @catagory.destroy
      render :json => { :success => true }
    else
      render :json => { :success => false }
    end
  end
    
end


