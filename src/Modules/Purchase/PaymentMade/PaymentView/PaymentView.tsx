import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useApi from '../../../../Hooks/useApi';
import { endpoints } from '../../../../Services/apiEdpoints';
import ChevronLeft from '../../../../assets/icons/ChevronLeft';
import Button from '../../../../Components/Button';
import Pen from '../../../../assets/icons/Pen';
import PrinterIcon from '../../../../assets/icons/PrinterIcon';
import SideBar from './SideBar';
import PdfView from './PdfView';

type Props = {};

function PaymentView({}: Props) {
  const[paymentData,setPaymentData]=useState<[]|any>([])
  const [organization]=useState<any>()
  const {request:getPayment}=useApi("get",5005)


  const {id}=useParams()

  const getPayments = async () => {
    try {
      const url = `${endpoints.GET_PAYMENT}/${id}`;
      const apiResponse = await getPayment(url);
      const { response, error } = apiResponse;
      if (!error && response) {
        setPaymentData(response.data);
      } else {
        console.error('API Error:', error?.response?.data?.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    }
  };

  useEffect(()=>{
    getPayments()
  },[])

  return (
    <div className="p-6 text-pdftext bg-white rounded-lg mx-7">
      <div className="flex items-center space-x-2 mb-4">
        <Link to={"/purchase/payment-made"}>
          <div
            style={{ borderRadius: "50%" }}
            className="w-[40px] h-[40px] flex items-center justify-center bg-[#F6F6F6]"
          >
            <ChevronLeft  />
          </div>
        </Link>
        <h1 className="text-[20px] font-bold text-[#303F58]">View Payment</h1>
      </div>
      <div className="flex justify-between items-center">
        <div className="space-x-3 items-center flex text-[#303F58] font-bold text-[16px]">
          <h3>Payment</h3>
          <h3 className="font-normal">|</h3>
          <h3>{paymentData?.paymentId}</h3>
          <p className="w-[47px] h-[25px] bg-[#F3F3F3] rounded-lg flex items-center justify-center">Draft</p>
        </div>
        <div className="flex space-x-3 mb-4">
          <Button className="h-[38px] w-[100px] flex justify-center items-center" variant="secondary">
            <Pen color="#0b9d56" />
            Edit
          </Button>

          <Button className="h-[38px] w-[100px] flex justify-center items-center" variant="secondary" size="sm" >
                    <PrinterIcon color="#0b9d56"  />
                    Print
                  </Button>
         
        </div>
      </div>
      <hr className="mb-5 border-loremcolor" />
      <div className="grid grid-cols-12 space-x-4">
     <div className='col-span-5'>  <SideBar data={paymentData}/></div>
        <div className='col-span-7'>
        <PdfView data={paymentData} organization={organization}/>
        </div>
      </div>
    </div>
  );
}

export default PaymentView;
