class Api::SessionController < ApplicationController
	# Log in
	def create
		user = User.find_by_credentials(
			params[:user][:email],
			params[:user][:password]
		)
		if user
			sign_in(user)
      render text: "User Login Success"
		else
      render text: "User Login Failed"
		end
	end

	#logout
	def destroy
		sign_out
    render text: "User Signed Out"
	end
end
