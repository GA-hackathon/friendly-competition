class VotesController < ApplicationController
  before_action :set_vote, only: [:destroy]
  before_action :set_votes, only: [:show]
  before_action :authorize_request, only: [:create, :destroy] 
  before_action :can_vote?, only: [:create] 

  # GET /votes
  def index
    @votes = Vote.all

    render json: @votes    
  end

  # GET /votes/1
  def show
    render json: @votes, include: :user
  end

  # POST /votes
  def create
    if can_vote?
    @vote = Vote.new(vote_params)
    
    if @vote.save
      render json: @vote, status: :created, location: @vote
    else
      render json: @vote.errors, status: :unprocessable_entity
    end
    end
  end

  # PATCH/PUT /votes/1
  def update
    if @vote.update(vote_params)
      render json: @vote
    else
      render json: @vote.errors, status: :unprocessable_entity
    end
  end

  # DELETE /votes/1
  def destroy
    @vote = Vote.find(params[:id])
    if @vote.present?
      @vote.destroy
    end
  end

  private

  def can_vote?
   @vote = Vote.find_by(user_id: params[:user_id], submission_id: params[:submission_id])
   if @vote
     false
   else 
    true
   end
  end

    # Use callbacks to share common setup or constraints between actions.
    def set_vote
      @vote = Vote.find_by(user_id: params[:user_id], submission_id: params[:submission_id])
    end

    def set_votes
      @votes = Vote.where(user_id: params[:user_id])
    end

    # Only allow a trusted parameter "white list" through.
    def vote_params
      params.require(:vote).permit(:user_id, :submission_id)
    end
end
