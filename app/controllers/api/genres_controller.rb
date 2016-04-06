class Api::GenresController < ApplicationController

	def show
		@genre = Genre.find(params[:id])
	end

	def index
		@page = params[:page].to_i || 1
		genre_records = Genre.all.page(@page)
		@page_count = genre_records.num_pages
		@genres = genre_records.includes(:ads)
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
