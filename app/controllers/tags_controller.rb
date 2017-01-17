class TagsController < ApplicationController
  def index
    respond_to do |format|
      format.json
      format.html
    end

  end
end
