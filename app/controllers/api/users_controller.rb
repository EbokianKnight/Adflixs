class Api::UsersController < ApplicationController

  #show a list of all users
  def index
    @users = User.all
  end

  #show a user
  def show
    @user = User.find(params[:id])
  end

	#Register New User
	def create
		@user = User.new(user_params)
		@user.admin = false
		if @user.save
			sign_in(@user)
      render :show
		else
			flash.now[:errors] = @user.errors.full_messages
			render text: "User Registration Failed"
		end
	end

	#Remove Registered User
	def destroy
		redirect_to root_url unless @current_user.admin
		User.find(params[:id]).destroy!
		render text: "User Account Destroyed"
	end

	private

	def user_params
		params.require(:user).permit(:password, :email)
	end
end
