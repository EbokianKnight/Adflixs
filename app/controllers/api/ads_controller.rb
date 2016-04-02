class Api::AdsController < ApplicationController

	def show
		get_ad
	end

	def index
		@ads = Ad.all
	end

	def create
		ad = Ad.new(ad_params)
		if ad.save!
			render :index
		else
			flash[:errors] = ad.errors.full_messages
			redirect_to root_url
		end
	end

	def destroy
		get_ad.try(:destroy!)
		flash.now[:errors] = ad.errors.full_messages
		render :index
	end

	private

	def get_ad
		@ad = Ad.find(params[:id])
	end

	def ad_params
		params.require(:ad).permit(:title, :company, :product, :description, :year, genre_ids: [])
	end
end
