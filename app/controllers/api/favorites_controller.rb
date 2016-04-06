class Api::FavoritesController < ApplicationController

  def index
    @favorites = current_user.mylist.includes(:genres, :views)
    @favorites.order(:created_at)
  end

  def create
    @favorite = Favorite.new(favorite_params)
    @favorite.user_id = current_user.id
    if @favorite.save!
      render json: {}
    else
      render json: { messages: @favorite.errors.full_messages }, status: 401
    end
  end

  def destroy
    ad = Ad.find(params[:id])
    @favorite = ad.favorites.where(user_id: current_user.id)
    @favorite[0].destroy!
    render json: {}
  end

  def favorite_params
    params.require(:favorite).permit(:ad_id)
  end

end
