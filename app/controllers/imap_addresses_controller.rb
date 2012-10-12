class ImapAddressesController < ApplicationController
  respond_to :json
  def show
    @imap_address = current_user.imap_addresses.find(params[:id])
    present @imap_address, with: Entity::ImapAddress, status: 200
  end

  def index
    @imap_addresses = current_user.imap_addresses
    present @imap_addresses, with: Entity::ImapAddress, status: 200
  end

  def create
    @imap_address = current_user.imap_addresses.build(params[:imap_address])
    if @imap_address.save
      present @imap_address, with: Entity::ImapAddress, status: 201
    else
      present_error @imap_address.errors.full_messages, status: 422
    end
  end

  def destroy
    @imap_address = current_user.imap_address.find(params[:id])
    @imap_address.destroy
    present @imap_address, with: Entity::ImapAddress, status: 200
  end

  def update
    @imap_address = current_user.imap_addresses.find(params[:id])
    if @imap_address.update_attributes(params[:imap_address])
      present @imap_address, with: Entity::ImapAddress, status: 200
    else
      present_error @imap_address.errors.full_messages, status: 422
    end
  end
end
