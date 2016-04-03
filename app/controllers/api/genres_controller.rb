class Api::GenresController < ApplicationController

	def show
		@genre = Genre.find(params[:id])
	end

	def index
		@genres = Genre.all
		@genres.includes(:ads)
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
