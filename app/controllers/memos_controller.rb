class MemosController < ApplicationController
  # helper methods executed before call is made to memo's controller methods
  before_action :current_user, :require_login

  # method to render view w/ memos
  # set instances variables to display current user & all memos belonging to logged in user
  def new
    @user = current_user
    @memos = @user.memos.all
    render 'new'
  end

  # method to create new memo, usng strong params
  def create
    @memo = Memo.create(memo_params)
    if @memo.save
      respond_to do |format|
        format.html {redirect_to :back}
        format.json {render json: @memo}
      end
    end
  end

  # method to edit memo, usng strong params
  def edit
    @memo = Memo.find(params[:id]).update(edit_params)
    respond_to do |format|
      format.html {redirect_to :back}
      format.json {render json: @memo}
    end
  end

  # method to delete memo
  def delete
    @memo = Memo.find(params[:id]).destroy
    @memos = Memo.all
    respond_to do |format|
      format.html {redirect_to :back}
      format.json {render json: @memos}
    end
  end

  # updates priority level of each memo based on memo color selected
  def priority
    Memo.find(params[:id]).update(priority: params[:priority])
    @memo_p = Memo.find(params[:id])
    @memo = Memo.find(params[:id])
    @memos = Memo.all
    respond_to do |format|
      format.html {redirect_to :back}
      format.json {render json: @memo}
    end
    # render json: @memo_p and return @memo
  end

  # private method encapsulating above param methods definitions
  private
    def memo_params
      params.require(:memo).permit(:title, :content, :user_id)
    end

    def edit_params
      params.require(:edit).permit(:content, :title)
    end
end
