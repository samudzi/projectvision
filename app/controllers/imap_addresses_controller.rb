class ImapAddressesController < ApplicationController
  respond_to :json
  def show
    @imap_address = current_user.imap_addresses.find(params[:id])
    render :json => {:data => @imap_address.attributes, :success => true}
    #present @imap_address, with: Entity::ImapAddress, status: 200
  end

  def index
    @imap_addresses = current_user.imap_addresses
    # present @imap_addresses, with: Entity::ImapAddress, status: 200

    params[:user_id] = current_user.id
    emails, row_count = ImapAddress.list(params)
    render :json => {
        :success => true,
        :totalRows => row_count,
        :data => emails.collect { |t| t.to_record}
    }
  end

  def create
    @imap_address = current_user.imap_addresses.find_by_email(params[:imap_address][:email])
    if @imap_address
      params[:id]= @imap_address.id
      update
      return
    end
    @imap_address = current_user.imap_addresses.build(params[:imap_address])
    
    if @imap_address.save
      Pv.imap_poller.new_imap_request(@imap_address)
      render :json => @imap_address.attributes.to_json
      #present @imap_address, with: Entity::ImapAddress, status: 201
    else
      present_error @imap_address.errors.full_messages, status: 422
    end
  end

  def poll_all
    @imap_addresses = current_user.imap_addresses
    if @imap_addresses.present?
      @imap_addresses.each {|imap_address|
        Pv.imap_poller.trigger_poll(imap_address)
      }
    end
    head 200
  end

  def trigger_poll
    @imap_address = current_user.imap_addresses.find(params[:id])
    Pv.imap_poller.trigger_poll(@imap_address)
    head 200
  end

  def destroy
    @imap_address = current_user.imap_addresses.find(params[:id])
    #@imap_address.destroy
    if @imap_address.destroy
      render :json => { :success => true }
    else
      render :json => { :success => false }
    end
    #present @imap_address, with: Entity::ImapAddress, status: 200
  end

  def update
    @imap_address = current_user.imap_addresses.find(params[:id])
    if @imap_address.update_attributes(params[:imap_address])
      render :json => @imap_address.attributes.to_json
      #present @imap_address, with: Entity::ImapAddress, status: 200
    else
      present_error @imap_address.errors.full_messages, status: 422
    end
  end
end
