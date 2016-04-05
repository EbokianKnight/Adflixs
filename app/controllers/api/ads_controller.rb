class Api::AdsController < ApplicationController

	def show
		get_ad
	end

	def index
		@ads = Ad.all.includes(:genres)
	end

	def create
		my_params = ad_params
		my_params["genre_ids"].map!(&:to_i) if ad_params["genre_ids"]

		ad = Ad.new(my_params)
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
		params.require(:ad).permit(:title, :company, :product, :description, :year, :youtube, genre_ids: [])
	end
end
