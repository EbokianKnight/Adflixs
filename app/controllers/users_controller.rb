class UsersController < ApplicationController

	#Register User Form
	def new
		@user = User.new
	end

	#Register New User
	def create
		@user = User.new(user_params)
		@user.admin = false
		if @user.save
			sign_in(@user)
			redirect_to root_url
		else
			flash.now[:errors] = @user.errors.full_messages
			render :new
		end
	end

	#Remove Registered User
	def destroy
		redirect_to root_url unless @current_user.admin
		User.find(params[:id]).destroy!
		render :index
	end

	private

	def user_params
		params.require(:user).permit(:password, :email)
	end

end
