class Api::FeaturesController < ApplicationController

  def index
    @feature = Feature.all.includes(:ad)
    render :index
  end

  def create
    @feature = Feature.new(feature_params)
    if @feature.save!
      render :show
    else
      render json: {}, status: 500
    end
  end

  def destroy
    @feature = Feature.find(params[:id]).destroy!
    render :show
  end

  private

  def feature_params
    params.require(:feature).permit(:ad_id)
  end

end
