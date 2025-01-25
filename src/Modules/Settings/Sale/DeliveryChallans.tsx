import { ChangeEvent, useState } from "react";
// import bgimage from "../../../../assets/Images/Organization-banner.png";
import toast from "react-hot-toast";
import useApi from "../../../Hooks/useApi";
import Button from "../../../Components/Button";
import Banner from "../Organization/Banner";
import TextArea from "../../../Components/Form/TextArea";

type Props = {};

interface DeliveryChallan {
  deliveryChellanTC: string;
  deliveryChellanCN: string;
}

function DeliveryChallan({}: Props) {
  const { request: addDeliveryChallan } = useApi("put", 5007);
  const [inputData, setInputData] = useState<DeliveryChallan>({
    deliveryChellanTC: "",
    deliveryChellanCN: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveDeliveryChallan = async () => {
    try {
      const url = ``;
      const apiResponse = await addDeliveryChallan(url, inputData);
      console.log(apiResponse);
      const { response, error } = apiResponse;
      if (!error && response) {
        toast.success("Delivery Challan saved successfully!");
      } else {
        toast.error("Failed to save Delivery Challan.");
      }
    } catch (error) {
      console.log(error, "Error in saving Delivery Challan");
      toast.error("An unexpected error occurred.");
    }
  };

  // useEffect(() => {
  //   getSettingsData();
  // }, []);

  // useEffect(() => {
  //   if (settingsResponse) {
  //     setInputData((prevData) => ({
  //       ...prevData,
  //       ...settingsResponse?.data?.deliveryChellans,
  //     }));
  //   }
  // }, [settingsResponse]);
  // console.log(settingsResponse?.data);

  return (
    <div className="p-5">
      <Banner />

      <p className="text-text_tertiary font-bold text-xl mt-4">
        Delivery Challans
      </p>

      <div className="mt-4 p-6 rounded-lg bg-white">
        <p className="font-bold text-text_tertiary text-sm mb-3">
          Terms & Conditions
        </p>
        <TextArea
          name="deliveryChellanTC"
          value={inputData.deliveryChellanTC}
          onChange={handleInputChange}
        />{" "}
        <p className="text-[12px] text-[#8F99A9]">
          Payment should be pay before due date
        </p>
      </div>

      <div className="mt-4 p-6 rounded-lg bg-white">
        <p className="font-bold text-text_tertiary text-sm mb-3">Customer Notes</p>
        <TextArea
          name="deliveryChellanCN"
          value={inputData.deliveryChellanCN}
          onChange={handleInputChange}
        />

        <p className="text-[12px] text-[#8F99A9]">
          Thank you for your payment. You just made our day
        </p>
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          size="sm"
          className="text-sm  pl-10 pr-10"
          onClick={handleSaveDeliveryChallan}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default DeliveryChallan;
