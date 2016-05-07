class Api::GenresController < ApplicationController

	def show
		@genre = Genre.find(params[:id]).includes(ads: :views)
	end

	def index
		@page = params[:page].to_i || 1
		genre_records = Genre.personalized_genres(current_user.id).page(@page)
		@page_count = (Genre.all.length / 3.0).ceil
		@genres = genre_records.includes(ads: :views)
	end

	def list
		@genres = Genre.all
		render :list
	end

	def create
		genre = Genre.new(genre_params)
		genre.save
		render :index
	end

	def destroy
		Genre.find(params[:id]).try(:destroy!)
		render :index
	end

	private

	def genre_params
		params.require(:genre).permit(:name)
	end

end
