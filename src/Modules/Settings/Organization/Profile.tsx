import { ChangeEvent, useEffect, useState } from "react";
import Button from "../../../Components/Button";
import useApi from "../../../Hooks/useApi";
// import toast from "react-hot-toast";
import { endpoints } from "../../../Services/apiEdpoints";
import Plus from "../../../assets/icons/Plus";
import Banner from "./Banner";
import Trash from "../../../assets/icons/Trash";
import Input from "../../../Components/Form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "../../../Components/Form/Select";
import PhoneNumberInput from "../../../Components/Form/PhoneInput";

interface InputData {
  organizationLogo?: string;
  organizationName: string;
  organizationCountry: string;
  organizationIndustry?: string;
  addline1?: string;
  addline2?: string;
  city?: string;
  pincode?: string;
  state: string;
  organizationPhNum: string;
  website?: string;
  baseCurrency: string;
  fiscalYear?: string;
  timeZone: string;
  timeZoneExp?: string;
  dateFormat: string;
  dateFormatExp?: string;
  dateSplit: string;
  phoneNumberCode?: string;
}

const Profile = () => {
  const [additionalData, setAdditionalData] = useState<any | null>([]);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [countryData, setcountryData] = useState<any | []>([]);
  const [currencyData, setcurrencyData] = useState<any | []>([]);
  const [stateList, setStateList] = useState<any | []>([]);
  const { request: getAdditionalData } = useApi("get", 5004);
  const { request: createOrganization } = useApi("post", 5004);
  const { request: getCurrencyData } = useApi("get", 5004);
  const { request: getCountryData } = useApi("get", 5004);

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
    organizationName: yup.string().required("Organization Name is a required field"),
    organizationLogo: yup.string().optional(),
    organizationCountry: yup.string().required("Country is a required field"),
    organizationIndustry: yup.string(),
    addline1: yup.string().optional(),
    addline2: yup.string().optional(),
    city: yup.string().optional(),
    pincode: yup.string().optional(),
    state: yup.string().required("State is a required field"),
    organizationPhNum: yup.string().required("Phone is a required field"),
    website: yup.string(),
    baseCurrency: yup.string().required("Base Currency is a required field"),
    fiscalYear: yup.string().optional(),
    timeZone: yup.string().required("Time Zone is a required field"),
    timeZoneExp: yup.string().optional(),
    dateFormat: yup.string().required("Date Format is a required field"),
    dateFormatExp: yup.string(),
    dateSplit: yup.string().required("Date Split is a required field"),
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

  const countrydata = [
    {
      name: "India",
      flag: "/flags/india.png",
      phoneNumberCode: "+91",
      phoneNumberLimit: 10,
    },
    {
      name: "USA",
      flag: "/flags/usa.png",
      phoneNumberCode: "+1",
      phoneNumberLimit: 10,
    },
    // Add more countries here
  ];
  const countryOptions = countrydata.map((country) => ({
    value: country.name,
    label: country.name,
  }));

  const fetchData = async (endpoint: any, setDataCallback: any) => {
    try {
      const { response, error } = await getAdditionalData(endpoint);
      if (!error && response) {
        setDataCallback(
          response.data[0]?.countries || response.data[0] || response.data
        );
      }
    } catch (error) {
      console.log(`Error in fetching data from ${endpoint}`, error);
    }
  };

  const fetchAllData = async () => {
    await fetchData(endpoints.GET_ADDITIONAL_DATA, setAdditionalData);
    await fetchData(endpoints.GET_COUNTRY_DATA, (data: any) =>
      setcountryData(data.countries)
    );
    await fetchData(endpoints.GET_CURRENCY_LIST, setcurrencyData);
  };

  const handleInputPhoneChange = (e: any) => {
    const rawInput = e.target.value.trim();
    const phoneNumberLimit = selectedCountry?.phoneNumberLimit || 0;

    let phoneNumber = rawInput
      .replace(selectedCountry?.phoneNumberCode, "")
      .trim();

    if (phoneNumber.length > phoneNumberLimit) {
      phoneNumber = phoneNumber.slice(0, phoneNumberLimit);
    }

    const enteredPhone = `${
      selectedCountry?.phoneNumberCode || ""
    } ${phoneNumber}`;

    // console.log(enteredPhone, "entered");

    setInputData((prevData) => ({
      ...prevData,
      organizationPhNum: enteredPhone,
    }));
  };

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

  // const selectTimeZone = (e: any) => {
  //   const selectedZone = e.target.value;

  //   const selectedTimeZone = additionalData.timezones.find(
  //     (timezone: any) => timezone.zone === selectedZone
  //   );

  //   console.log(selectedTimeZone);

  //   if (selectedTimeZone) {
  //     setInputData((prevDetails) => ({
  //       ...prevDetails,
  //       timeZone: selectedZone,
  //       timeZoneExp: selectedTimeZone.timeZone,
  //     }));
  //   }
  // };

  // const selectDateFormat = (e: any) => {
  //   const selectedFormat = e.target.value;

  //   const selectedDateFormat = [
  //     ...additionalData.dateFormats.short,
  //     ...additionalData.dateFormats.medium,
  //     ...additionalData.dateFormats.long,
  //   ].find((dateFormat) => dateFormat.format === selectedFormat);

  //   console.log(selectedDateFormat);

  //   if (selectedDateFormat) {
  //     setInputData((prevDetails: any) => ({
  //       ...prevDetails,
  //       dateFormat: selectedFormat,
  //       dateFormatExp: selectedDateFormat.dateFormat,
  //     }));
  //   }
  // };

  const onSubmit: SubmitHandler<InputData> = async (data, event) => {
    event?.preventDefault();
    console.log("Form Data:", data);

    try {
      const { response, error } = await createOrganization(
        endpoints.CREATE_ORGANIZATION,
        data
      );
      if (response && !error) {
        // toast.success(response.data.message); // Show success toast
      } else if (error) {
        // toast.error(error.response?.data?.message || "An error occurred.");
      }
    } catch (err) {
      console.error("Unexpected error submitting data:", err);
      // toast.error("An unexpected error occurred."); // Handle unexpected errors
    }
  };

  const handleDeleteImage = () => {
    setInputData((prevDetails: any) => ({
      ...prevDetails,
      organizationLogo: "",
    }));
  };
  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {}, [countryData]);

  useEffect(() => {
    if (selectedCountry === null && inputData.organizationCountry) {
      const matchingCountry = countryData.find(
        (country: any) => country.name === inputData.organizationCountry
      );

      if (matchingCountry) {
        setSelectedCountry(matchingCountry);
      } else {
        const matchingCountry = countryData.find(
          (country: any) => country.name === "India"
        );
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

  const handleInputChange = (field: keyof InputData) => {
    clearErrors(field);
  };

  // const setFormValues = (data: InputData) => {
  //   Object.keys(data).forEach((key) => {
  //     setValue(key as keyof InputData, data[key as keyof InputData]);
  //   });
  // };


  return (
    <div className="  overflow-y-scroll hide-scrollbar h-[100vh]">
      <Banner seeOrgDetails />

      {/* FORM */}
      <form
        className="text-slate-800 text-sm "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="h-56 p-3 border-dashed border-neutral-400  rounded-md mt-5 border bg-white text-textColor w-[403px]">
          {" "}
          <label>
            <div
              className={`bg-[#f8f7f5] mt-2 flex h-28 justify-center items-center rounded-lg ${
                inputData.organizationLogo ? "h-[90px] rounded-b-none" : ""
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

        <div className="bg-white p-5 rounded-lg mt-2">
          <div className="grid grid-cols-3 gap-4 ">
            <Input
              required
              label="Organization Name"
              placeholder="Enter organization Name"
              error={errors.organizationName?.message}
              {...register("organizationName", {
                onChange: () => handleInputChange("organizationName"),
              })}
            />

            <Select
              required
              placeholder="Select Country"
              error={errors.organizationCountry?.message}
              label="Organization Location"
              options={countryOptions}
              onChange={(value: string) => {
                setValue("organizationCountry", value);
                handleInputChange("organizationCountry");
              }}
              value={watch("organizationCountry")}
            />

            <Select
              required
              placeholder="Select Industry"
              error={errors.organizationIndustry?.message}
              onChange={(value: string) => {
                setValue("organizationIndustry", value);
                handleInputChange("organizationIndustry");
              }}
              value={watch("organizationIndustry")}
              label="Organization Indusrty"
              options={[]}
            />
          </div>

          <div className="grid grid-cols-2 gap-x-4 mt-3 space-y-3">
            <Input
              label="Organization Address"
              placeholder="Street 1"
              error={errors.addline1?.message}
              {...register("addline1")}
              onChange={() => handleInputChange("addline1")}
            />

            <div className="pt-2.5">
              <Input
                label=""
                placeholder="Street 2"
                error={errors.addline2?.message}
                {...register("addline2")}
                onChange={() => handleInputChange("addline2")}
              />
            </div>
            <Input
              label="City"
              placeholder="Enter City"
              error={errors.city?.message}
              {...register("city")}
              onChange={() => handleInputChange("city")}
            />
            <Input
              label="Pin / Zip / Post Code"
              placeholder="Pin / Zip / Post Code"
              error={errors.pincode?.message}
              {...register("pincode")}
              onChange={() => handleInputChange("pincode")}
            />
            <Select
              required
              placeholder="Select State / Region / County"
              error={errors.state?.message}
              onChange={() => handleInputChange("state")}
              label="State / Region / County"
              options={[]}
            />
            <PhoneNumberInput
              label="Phone"
              name="companyPhone"
              error={errors.organizationPhNum?.message}
              placeholder="Enter phone number"
              value={watch("organizationPhNum")}
              onChange={(value) => {
                handleInputChange("organizationPhNum");
                setValue("organizationPhNum", value);
              }}
              countryData={countrydata}
            />
          </div>
        </div>

        <p className="mt-4 text-text_tertiary ">
          <b>Website Address</b>
        </p>

        <div className="bg-white p-5 rounded-lg mt-2">
          <Input
            label="Website URL"
            placeholder="Website URL"
            error={errors.website?.message}
            {...register("website")}
            onChange={() => handleInputChange("website")}
          />
        </div>

        <p className="mt-4 text-text_tertiary ">
          <b>Financial Settings</b>
        </p>

        <div className="bg-white p-5 rounded-lg mt-2 grid grid-cols-2 gap-4">
          <Select
            required
            placeholder=" Select Currency"
            error={errors.baseCurrency?.message}
            onChange={() => handleInputChange("baseCurrency")}
            label="Base Currency"
            options={[]}
          />
          <Select
            required
            placeholder="Select Financial Year"
            error={errors.fiscalYear?.message}
            onChange={() => handleInputChange("fiscalYear")}
            label="Financial Year"
            options={[]}
          />
        </div>

        <p className="mt-4 text-text_tertiary ">
          <b>Preferences </b>
        </p>

        <div className="grid grid-cols-12 gap-4 bg-white p-5 rounded-lg mt-2">
          <div
            className=" col-span-8
            "
          >
            <Select
              required
              placeholder="Select Time zone"
              error={errors.timeZone?.message}
              onChange={() => handleInputChange("timeZone")}
              label="Time Zone"
              options={[]}
            />
          </div>
          <div
            className=" col-span-8
            "
          >
            <Select
              required
              placeholder="Select Date Fromat"
              error={errors.dateFormat?.message}
              onChange={() => handleInputChange("dateFormat")}
              label="Date Format"
              options={[]}
            />
          </div>
          <div className="col-span-4 pt-6">
            <Select
              placeholder="Select Date Split"
              error={errors.dateSplit?.message}
              onChange={() => handleInputChange("dateSplit")}
              label=""
              options={[]}
            />
          </div>
        </div>

        <div className="flex my-4 gap-4">
          <Button variant="primary" size="sm" type="submit">
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
