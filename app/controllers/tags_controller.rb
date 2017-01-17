class TagsController < ApplicationController
  def index
    respond_to do |format|
      format.json
      format.html
    end
  end

  def create
    @tag = Tag.create(tag_params)

    if @tag.save

      respond_to do |format|
        format.html { redirect_to tags_path }
        format.json { render json: @tag.reload }
      end
    else

      respond_to do |format|
        format.html { redirect_to tags_path }
        format.json  # { render json: @tag.errors }
      end
    end
  end

  private

    def tag_params
      params.require(:tag).permit(:x, :y, :name)
    end
end
