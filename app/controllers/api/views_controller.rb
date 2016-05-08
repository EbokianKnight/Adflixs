class Api::ViewsController < ApplicationController

  def show
    @view = View.find(params[:id])
  end

  def create
    @view = View.new(view_params)
    @view.user_id = current_user.id
    save_view_transaction({is_create: true})
  end

  def update
    @view = View.find(params[:id])
    save_view_transaction({is_create: false})
  end

  private

  def update_average_rating
    return unless (params[:rate])
    ad = @view.new_average_rating(params[:rate])
    return if ad.save!
    render json: { messages: ad.errors.full_messages }, status: 401
  end

  def save_view_transaction(route)
    ActiveRecord::Base.transaction do
      begin
        update_average_rating
        if route[:is_create]
          @view.save!
        else
          @view.update_attributes(view_params)
        end
        render :show
      rescue ActiveRecord::RecordInvalid
        render json: { messages: @view.errors.full_messages }, status: 401
        raise ActiveRecord::Rollback
      end
    end
  end

  def view_params
    params.require(:view).permit(:ad_id, :title, :rate, :review)
  end

end
