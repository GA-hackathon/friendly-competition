class SubmissionsController < ApplicationController
  before_action :set_submission, only: [:show]
  before_action :authorize_request, only: [ :create, :update, :destroy] 
  before_action :set_user_submission, only: [ :update, :destroy]

  # GET /submissions
  def index
    @votes = Vote.all
    @submissions = Submission.newest_first

    for @submission in @submissions do  
      @submission.votes = @votes.filter {|v| v.submission_id == @submission.id }
    end

    render json: @submissions.map {|submission| merge_votes_and_user(submission)}
  end


  # GET /submissions/1
  def show
    render json: merge_votes_and_user(@submission)
  end

  # POST /submissions
  def create
    @submission = Submission.new(submission_params)

    @submission.user = @current_user

    if @submission.save
      render json: @submission, status: :created, location: @submission
    else
      render json: @submission.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /submissions/1
  def update
    if @submission.update(submission_params)
      render json: @submission
    else
      render json: @submission.errors, status: :unprocessable_entity
    end
  end

  # DELETE /submissions/1
  def destroy
    @submission.destroy
  end

  private


  def merge_votes_and_user(submission)
     submission.attributes.merge({user: submission.user, votes: submission.votes})
  end


    # Use callbacks to share common setup or constraints between actions.
    def set_submission
      @submission = Submission.find(params[:id])
    end

    def set_user_submission
      @submission = @current_user.submissions.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def submission_params
      params.require(:submission).permit(:content, :name, :file, :user_id, :contest_id)
    end
end
