class V1::HospitalsController < ApplicationController
  def index
    hospitals = Hospital.order('code DESC');
    render json: {status:"SUCCESS", message:'Loaded LPU', data:hospitals},status: :ok
  end
  def show
    hospital =  Hospital.find(params[:id]);
    render json: {status:"SUCCESS", message:'Loaded hospital', data:hospital},status: :ok
  end
  def create
    hospital =  Hospital.new(hospital_params);
    begin
      if hospital.save
        render json: {status:"SUCCESS", message:'added hospital', data:hospital},status: :ok
      else
        render json: {status:"ERROR", message:'hospital not added',
          data:hospital.errors},status: :unprocessable_entity
      end
      rescue ActiveRecord::RecordNotUnique
            render json: {status:"ERROR", message:'hospital not added',
              data:'code already exist'},status: :unprocessable_entity
    end
  end

  def destroy
    begin
      hospital =  Hospital.find(params[:id]);
      hospital.destroy
      render json: {status:"SUCCESS", message:'hospital is destroyed', data:hospital},status: :ok
    rescue ActiveRecord::RecordNotFound
          render json: {status:"ERROR", message:'hospital not destroyed',
            data:'hospital not exist'},status: :unprocessable_entity
    end
  end
  def update
    begin
      hospital =  Hospital.find(params[:id]);
      if hospital.update(hospital_params)
        render json: {status:"SUCCESS", message:'hospital is updated', data:hospital},status: :ok
      else
        render json: {status:"ERROR", message:'hospital is not updated',
          data:hospital.errors},status: :unprocessable_entity
      end
    rescue ActiveRecord::RecordNotFound
        render json: {status:"ERROR", message:'hospital not updated',
          data:'hospital not exist'}, status: :unprocessable_entity
    rescue  ActiveRecord::RecordNotUnique
            render json: {status:"ERROR", message:'hospital not updated',
              data:'updated hospital has not unique code'},status: :unprocessable_entity
    end
  end

  private
  def  hospital_params
    params.permit(:name, :code, :shortname, :boss, :po_code, :address)
  end
end
