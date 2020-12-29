

class UsersController < ApplicationController
  before_action :authorize_request, only: [ :update, :destroy]
  before_action :set_user, only: [:show, :update]

  def index
    @users = User.all

    render json: @users 
  end

  def show
    render json: @user
  end


  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      @token = encode({id: @user.id})
      render json: {
        user: @user.attributes.except("password_digest"),
        token: @token
        }, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private

    # Only allow a trusted parameter "white list" through.
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:email, :first_name, :last_name, :zip_code, :image, :password)
    end

end
