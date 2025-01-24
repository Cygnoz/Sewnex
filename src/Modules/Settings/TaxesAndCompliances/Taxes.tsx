import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Button";
import GSTComponent from "./gst/GSTComponent";
import VATComponent from "./vat/VATComponent";
import useApi from "../../../Hooks/useApi";
import { endpoints } from "../../../Services/apiEdpoints";
import Banner from "../Organization/Banner";
import RadioButton from "../../../Components/Form/RadioButton";

type Props = {};

function Taxes({}: Props) {
  const [selected, setSelected] = useState<string>("GST");
  const [taxType, setTaxType] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const { request: AllTaxGst } = useApi("get", 5004);

  const fetchAllTaxGst = async () => {
    try {
      const url = `${endpoints.GET_ALL_TAX}`;
      const { response, error } = await AllTaxGst(url);
      if (!error && response) {
        const gstTaxRates = response.data;
        const taxType = gstTaxRates?.taxType || "";
        setTaxType(taxType);
        console.log(taxType);
      }
    } catch (error) {
      console.error("Error fetching tax data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTaxGst();
  }, []);

  const handleProceed = () => {
    if (selected === "GST") {
      navigate("/settings/tax-compliance/GST");
    } else if (selected === "VAT") {
      navigate("/settings/tax-compliance/VAT");
    }
  };

  const handleChange = (value: string) => {
    setSelected(value);
  };

  if (loading) {
    return (
      <div className="p-5">
        <p className="mt-5">Loading...</p>
      </div>
    );
  }

  if (taxType === "GST") {
    return <GSTComponent />;
  } else if (taxType === "VAT") {
    return <VATComponent />;
  } else {
    return (
      <>
        <Banner />
        <div className="mt-5">
          <div
            className="mt-3 p-6 rounded-lg flex justify-between items-center gap-4"
            style={{
              background:
                "linear-gradient(89.66deg, #E3E6D5 -0.9%, #F7E7CE 132.22%)",
            }}
          >
            <div>
              <p className="text-[#303F58] text-sm">
                Choose your Tax Type for your business
              </p>
              <div className="flex items-start gap-[22px] text-[#495160] mt-4">
                {/* GST Radio Button */}
                <RadioButton
                  id="GST"
                  name="taxType"
                  label="GST"
                  selected={selected}
                  onChange={handleChange}
                  labelClassName="text-base text-[#495160] font-semibold cursor-pointer"
                />
                {/* VAT Radio Button */}
                <RadioButton
                  id="VAT"
                  name="taxType"
                  label="VAT"
                  selected={selected}
                  onChange={handleChange}
                  labelClassName="text-base text-[#495160] font-semibold cursor-pointer"
                />
              </div>
            </div>
            <div>
              <Button
                variant="primary"
                size="sm"
                className="text-sm font-medium"
                onClick={handleProceed}
              >
                Proceed
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Taxes;
