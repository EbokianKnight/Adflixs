class Api::SessionsController < ApplicationController
	# Log in
	def show
		@user = current_user
		if signed_in?
      render :show
    else
      render json: { message: "Not logged in" }, status: 401
  	end
	end

	def create
		@user = User.find_by_credentials(
			params[:user][:email],
			params[:user][:password]
		)
		if @user
			sign_in(@user)
      render :show
		else
      render json: { message: "Invalid email or password" }, status: 401
		end
	end

	#logout
	def destroy
		sign_out
    render json: {}
	end
end
