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
    @user = current_user
    if @user.id == params[:id].to_i && @user.update_attributes!(user_params)
      render :show
  	else
  		format.json { render json: { :error => @user.errors.full_messages }, status: 422 }
  	end
  end

	#Register New User
	def create
		@user = User.new(user_params)
		@user.admin = false
		if @user.save
			sign_in(@user)
      register_views = Ad.find_by_title("RegisterViewsWithUser")
      View.create(user_id: @user.id, ad_id: register_views.id)
      render :show
		else
			format.json { render json: { :error => @user.errors.full_messages }, status: 422 }
		end
	end

	#Remove Registered User
	def destroy
    if current_user.id == params[:id]
      user = current_user
      user.sign_out
  		user.destroy!
  		render json: { message: "deleted user" }
    end
    render json: { message: "failed to delete user" }
	end

	private

	def user_params
		params.require(:user).permit(:password, :email)
	end
end
