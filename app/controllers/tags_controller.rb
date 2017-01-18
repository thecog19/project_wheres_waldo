class TagsController < ApplicationController
  def index
    @tags = Tag.all
    @names = Name.all
    respond_to do |format|
      format.json{ render json: {names: @names, tags: @tags }}
      format.html
    end
  end

  def create
    @tag = Tag.create(tag_params)

    if @tag.save

      respond_to do |format|
        format.html { redirect_to tags_path }
        format.json { render json: {tag: @tag.reload, name: @tag.name.name }}
      end
    else

      respond_to do |format|
        format.html { redirect_to tags_path }
        format.json  # { render json: @tag.errors }
      end
    end
  end

  def destroy
    @tag = Tag.find(params[:id])

    if @tag.destroy

      respond_to do |format|
        format.html { redirect_to tags_path }
        format.json { render json: {tag: @tag, name: @tag.name }}
      end

    else
      
      print "WHAT HAVE YOU DONE?"
      respond_to do |format|
        format.html { redirect_to tags_path }
        format.json  # { render json: @tag.errors }
      end

    end

  end

  private

    def tag_params
      params.require(:tag).permit(:x, :y, :name_id)
    end
end
