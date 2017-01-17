class ScoresController < ApplicationController
  def create
    @score = Score.create(score_params)

    if @score.save
      respond_to do |format|
        format.html { redirect_to tags_path }
        format.json { render json: @score.reload }
      end
    else
      respond_to do |format|
        format.html { redirect_to tags_path }
        format.json
      end
    end
  end

  def index
  end

  private

    def score_params
      params.require(:score).permit(:score)
    end
end
