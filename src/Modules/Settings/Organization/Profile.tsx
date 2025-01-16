import { ChangeEvent, useEffect, useState } from "react";
import Button from "../../../Components/Button";
import useApi from "../../../Hooks/useApi";
// import toast from "react-hot-toast";
import Tooltip from "../../../Components/tooltip/Tooltip";
import { endpoints } from "../../../Services/apiEdpoints";
import Plus from "../../../assets/icons/Plus";
import Banner from "./Banner";
import Trash from "../../../assets/icons/Trash";
import Input from "../../../Components/Form/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface InputData {
  organizationLogo?: string;
  organizationName?: string;
  organizationCountry?: string;
  organizationIndustry?: string;
  addline1?: string;
  addline2?: string;
  city?: string;
  pincode?: string;
  state?: string;
  organizationPhNum?: string;
  website?: string;
  baseCurrency?: string;
  fiscalYear?: string;
  timeZone?: string;
  timeZoneExp?: string;
  dateFormat?: string;
  dateFormatExp?: string;
  dateSplit?: string;
  phoneNumberCode?: string;
}

const Profile = () => {
  const [additionalData, setAdditionalData] = useState<any | null>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [countryData, setcountryData] = useState<any | []>([]);
  const [currencyData, setcurrencyData] = useState<any | []>([]);
  const [stateList, setStateList] = useState<any | []>([]);
  const { request: getAdditionalData } = useApi("get", 5004);
  const { request: createOrganization } = useApi("post", 5004);
  const { request: getCurrencyData } = useApi("get", 5004);
  const [tooltipState, setTooltipState] = useState<{ [key: string]: boolean }>({
    industry: false,
    address: false,
    baseCurrency: false,
  });



  const [inputData, setInputData] = useState<InputData>({
    organizationLogo: "",
    organizationName: "",
    organizationCountry: "",
    organizationIndustry: "",
    addline1: "",
    addline2: "",
    city: "",
    pincode: "",
    state: "",
    organizationPhNum: "",
    website: "",
    baseCurrency: "",
    fiscalYear: "",
    timeZone: "",
    timeZoneExp: "",
    dateFormat: "",
    dateFormatExp: "",
    dateSplit: "",
    phoneNumberCode: "",
  });

  const validationSchema = yup.object({
    organizationName: yup.string(),
    organizationLogo: yup.string().optional(),
    organizationCountry: yup.string(),
    organizationIndustry: yup.string(),
    addline1: yup.string().optional(),
    addline2: yup.string().optional(),
    city: yup.string().optional(),
    pincode: yup.string().optional(),
    state: yup.string().optional(),
    organizationPhNum: yup.string().optional(),
    website: yup.string(),
    baseCurrency: yup.string().optional(),
    fiscalYear: yup.string().optional(),
    timeZone: yup.string().optional(),
    timeZoneExp: yup.string().optional(),
    dateFormat: yup.string(),
    dateFormatExp: yup.string(),
    dateSplit: yup.string(),
    phoneNumberCode: yup.string(),
  });
  
  
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<InputData>({
    resolver: yupResolver(validationSchema),
  });
  
  



  const fetchData = async (endpoint:any, setDataCallback:any) => {
    try {
      const { response, error } = await getAdditionalData(endpoint); // Ensure your data-fetching method works for all endpoints
      if (!error && response) {
        setDataCallback(response.data[0]?.countries || response.data[0] || response.data);
      }
    } catch (error) {
      console.log(`Error in fetching data from ${endpoint}`, error);
    }
  };
  
  // Usage
  const fetchAllData = async () => {
    await fetchData(endpoints.GET_ADDITIONAL_DATA, setAdditionalData);
    await fetchData(endpoints.GET_COUNTRY_DATA, (data:any) => setcountryData(data.countries));
    await fetchData(endpoints.GET_CURRENCY_LIST, setcurrencyData);
  };
  



  const handleInputPhoneChange = (e: any) => {
    const rawInput = e.target.value.trim();
    const phoneNumberLimit = selectedCountry?.phoneNumberLimit || 0;

    let phoneNumber = rawInput.replace(selectedCountry?.phoneNumberCode, '').trim();

    if (phoneNumber.length > phoneNumberLimit) {
      phoneNumber = phoneNumber.slice(0, phoneNumberLimit);
    }

    const enteredPhone = `${selectedCountry?.phoneNumberCode || ''} ${phoneNumber}`;

    // console.log(enteredPhone, "entered");

    setInputData((prevData) => ({
      ...prevData,
      organizationPhNum: enteredPhone
    }));
  };


  // const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setInputData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: string // Specify the key to update, e.g., "organizationLogo"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        setInputData((prevData) => ({
          ...prevData,
          [key]: base64String,
        }));
      };

      reader.readAsDataURL(file);
    }
  };


  const selectTimeZone = (e: any) => {
    const selectedZone = e.target.value;

    const selectedTimeZone = additionalData.timezones.find(
      (timezone: any) => timezone.zone === selectedZone
    );

    console.log(selectedTimeZone);

    if (selectedTimeZone) {
      setInputData((prevDetails) => ({
        ...prevDetails,
        timeZone: selectedZone,
        timeZoneExp: selectedTimeZone.timeZone,
      }));
    }
  };

  const selectDateFormat = (e: any) => {
    const selectedFormat = e.target.value;

    const selectedDateFormat = [
      ...additionalData.dateFormats.short,
      ...additionalData.dateFormats.medium,
      ...additionalData.dateFormats.long,
    ].find((dateFormat) => dateFormat.format === selectedFormat);

    console.log(selectedDateFormat);

    if (selectedDateFormat) {
      setInputData((prevDetails: any) => ({
        ...prevDetails,
        dateFormat: selectedFormat,
        dateFormatExp: selectedDateFormat.dateFormat,
      }));
    }
  };

  const handleCreateOrganization = async (e: any) => {
    e.preventDefault();
    try {
      const url = `${endpoints.CREATE_ORGANIZATION}`;
      const apiResponse = await createOrganization(url, inputData);
      const { response, error } = apiResponse;

      if (!error && response) {
        // toast.success(response.data.message);
        // getOrganization()

      } else {
        // toast.error(error.response.data.message);
      }
    } catch (error) {
      console.log(error, "Error in creating organization");
    }
  };


  const handleDeleteImage = () => {
    setInputData((prevDetails: any) => ({
      ...prevDetails,
      organizationLogo: "",
    }));
  };
  useEffect(() => {
   fetchAllData()
  }, []);

  useEffect(() => {
  }, [countryData])

  useEffect(() => {
    if (selectedCountry === null && inputData.organizationCountry) {
      const matchingCountry = countryData.find((country: any) => country.name === inputData.organizationCountry);

      // If a matching country is found, set it as selectedCountry
      if (matchingCountry) {

        setSelectedCountry(matchingCountry);
      }
      else {
        const matchingCountry = countryData.find((country: any) => country.name === "India");
        setSelectedCountry(matchingCountry);

      }
    }
  }, [selectedCountry, inputData.organizationCountry, countryData]);


  useEffect(() => {
    if (inputData.organizationCountry) {
      const country = countryData.find(
        (c: any) => c.name === inputData.organizationCountry
      );
      if (country) {
        setStateList(country.states || []);
      }
    }
  }, [inputData.organizationCountry, countryData, inputData.organizationLogo]);

  const handleTooltipToggle = (tooltip: string, state: boolean) => {
    setTooltipState((prevState) => ({
      ...prevState,
      [tooltip]: state,
    }));
  };

  const handleInputChange = (field: keyof InputData) => {
    clearErrors(field); // Clear the error for the specific field when the user starts typing
  };

  const renderCustomTooltip = (content: string) => {
    return (
      <Tooltip
        fontsize="12px"
        content={content}
        textColor="#ffffff"
        bgColor="#585953"
        arrowColor="transparant"
        width="250px"
      />
    );
  };
  console.log(selectedCountry, "selectedCountry");

  return (
    <div className=" m-4 overflow-y-scroll hide-scrollbar h-auto">
      <Banner seeOrgDetails />

      {/* FORM */}
      <form className="text-slate-800 text-sm">
        <div className="h-56 p-3 border-dashed border-neutral-400  rounded-md mt-5 border bg-white text-textColor w-[403px]">
          {" "}
          <label>
            <div
              className={`bg-[#f8f7f5] mt-2 flex h-28 justify-center items-center rounded-lg ${inputData.organizationLogo ? "h-[90px] rounded-b-none" : ""
                }`}
            >
              {inputData.organizationLogo ? (
                <div className="">
                  <img
                    src={inputData.organizationLogo}
                    alt=""
                    className="py-0 h-[51px]"
                  />
                </div>
              ) : (
                <>
                  <div className="justify-center flex items-center bg-[#00534d] text-white  p-1 rounded-full ">
                    <Plus color="white" classname="h-3 w-3" />
                  </div>
                  <p className="text-sm ms-2">
                    {" "}
                    Upload Your Organizational Logo
                  </p>
                </>
              )}
              <input
                accept="image/*"
                type="file"
                className="hidden"
                onChange={(e) => handleFileChange(e, "organizationLogo")}
              />
            </div>
          </label>
          {inputData.organizationLogo && (
            <div className="bg-neutral-200 rounded-b-lg h-7 flex items-center justify-end px-4">
              <div onClick={handleDeleteImage}>
                {" "}
                <Trash color={"darkRed"} />
              </div>
            </div>
          )}
          <div className="text-center">
            <p className="mt-3 text-text_primary ">
              <b>Organization Logo</b>
            </p>
            <p className="text-xs mt-1 text-text_secondary">
              Preferred Image Dimensions: 240&times;240&times; pixels @ 72 DPI{" "}
              <br />
              Maximum File size 1MB
            </p>
          </div>
        </div>

        <p className="mt-4 text-text_tertiary ">
          <b>Organizational Details</b>
        </p>

        <div className="grid grid-cols-3">
          
        <Input
              label="Organization Name"
              placeholder="Enter organization Name"
              error={errors.organizationName?.message}
              {...register("organizationName")}
              onChange={() => handleInputChange("organizationName")}
            />
        </div>

       

        <div className="flex my-4 gap-4">
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => handleCreateOrganization(e)}
          >
            Save
          </Button>

          <Button variant="secondary" size="sm">
            Cancel
          </Button>
        </div>
      </form>


    </div>
  );
};

export default Profile;

