class Api::SessionsController < ApplicationController
	# Log in
	def create
		@user = User.find_by_credentials(
			params[:user][:email],
			params[:user][:password]
		)
		if @user
			sign_in(@user)
      render :create
		else
      render json: { message: "Invalid credentials" }, status: 401
		end
	end

	#logout
	def destroy
		sign_out
    render json: {}
	end
end
