class ContestsController < ApplicationController
  before_action :set_contest, only: [:show]
  before_action :authorize_request, only: [:create, :update, :destroy] 
  before_action :set_user_contest, only: [:update, :destroy]
  # GET /contests
  def index
    @contests = Contest.newest_first

    render json: @contests, :include => {:user => {:include => :submissions}} 
  end

  def last_2
    @contests = Contest.last(2)

    render json: @contests, :include => {:user => {:include => :submissions}} 
  end

  def first_2
    @contests = Contest.first(2)

    render json: @contests, :include => {:user => {:include => :submissions}} 
  end

  # GET /contests/1
  def show
    render json: @contest, :include => {:user => {:include => :submissions}} 
  end

  # POST /contests
  def create
    @contest = Contest.new(contest_params)
    @contest.user = @current_user

    if @contest.save
      render json: @contest, status: :created, location: @contest
    else
      render json: @contest.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /contests/1
  def update
    if @contest.update(contest_params)
      render json: @contest, include: :user
    else
      render json: @contest.errors, status: :unprocessable_entity
    end
  end

  # DELETE /contests/1
  def destroy
    @contest.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_contest
      @contest = Contest.find(params[:id])
    end
    
    def set_user_contest
      @contest = @current_user.contests.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def contest_params
      params.require(:contest).permit(:category, :name, :rules, :ending_time, :picture)
    end
end
