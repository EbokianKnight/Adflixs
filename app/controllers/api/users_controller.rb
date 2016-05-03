class Api::UsersController < ApplicationController

  #show a list of all users
  def index
    @users = User.all
    @user.includes(:views)
  end

  #show a user
  def show
    @user = User.find(params[:id])
  end

  def update
    @user.find(params[:id])
    if @user.update_attributes!(user_params)
      render :show
  	else
  		render json: { message: @user.errors.full_messages }
  	end
  end

	#Register New User
	def create
		@user = User.new(user_params)
		@user.admin = false
		if @user.save
			sign_in(@user)
      register_views = Ad.find_by_title("RegisterViewsWithUser")
      View.create(user_id: current_user.id, ad_id: register_views.id)
      render :show
		else
			render json: { message: @user.errors.full_messages }
		end
	end

	#Remove Registered User
	def destroy
		redirect_to root_url unless @current_user.admin
		User.find(params[:id]).destroy!
		render json: { message: ["user account destroyed"] }
	end

	private

	def user_params
		params.require(:user).permit(:password, :email, :oldpassword)
	end
end
