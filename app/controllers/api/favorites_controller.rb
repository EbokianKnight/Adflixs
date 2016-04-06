class Api::FavoritesController < ApplicationController

  def index
    @favorites = current_user.mylist.includes(:genres, :views)
    @favorites.order(:created_at)
  end

  def create
    @favorite = Favorite.new(params[:ad_id])
    @favorite.user_id = current_user.id
    if @favorite.save!
      render :create
    else
      render json: { messages: @favorite.errors.full_messages }, status: 401
    end
  end

  def destroy
    @favorite = Favorite.find(params[:id])
    @favorite.destroy!
    render json: {}
  end

end
