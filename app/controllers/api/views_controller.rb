class Api::ViewsController < ApplicationController

  def show
    @view = View.find(params[:id])
  end

  def create
    @view = View.new(view_params)
    @view.user_id = current_user.id
    if @view.save!
      render :show
    else
      render json: { messages: @view.errors.full_messages }, status: 401
    end
  end

  def update
    @view = View.find(params[:id])
    if @view.update_attributes(view_params)
      render :show
    else
      render json: { messages: @view.errors.full_messages }, status: 401
    end
  end

  private

  def view_params
    params.require(:view).permit(:ad_id, :title, :rate, :review)
  end

end
