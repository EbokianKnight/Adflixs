class SessionsController < ApplicationController

	# Form to Log In
	def new
	end

	# Log in
	def create
		user = User.find_by_credentials(
			params[:user][:email],
			params[:user][:password]
		)
		if user
			sign_in(user)
			redirect_to root_url + "ads"
		else
			flash.now[:errors] = ["Invalid Email or Password"]
			render :new
		end
	end

	#logout
	def destroy
		sign_out
		redirect_to root_url
	end

end
