import { ChangeEvent, useEffect, useState } from "react";
import Button from "../../../Components/Button";
import useApi from "../../../Hooks/useApi";
// import toast from "react-hot-toast";
import { endpoints } from "../../../Services/apiEdpoints";
import Plus from "../../../assets/icons/Plus";
import Banner from "./Banner";
import Trash from "../../../assets/icons/Trash";
import Input from "../../../Components/Form/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "../../../Components/Form/Select";
import PhoneNumberInput from "../../../Components/Form/PhoneInput";
import toast from "react-hot-toast";

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
  fiscalYear: string;
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
  const { request: getOneOrganization } = useApi("get", 5004);

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
    organizationName: yup
      .string()
      .required("Organization Name is a required field"),
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
    fiscalYear: yup.string().required("Financial is a required field"),
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
    formState: { errors },
  } = useForm<InputData>({
    resolver: yupResolver(validationSchema),
  });

  const fetchData = async (endpoint: any, setDataCallback: any) => {
    try {
      const { response, error } = await getAdditionalData(endpoint);
      if (!error && response) {
        setDataCallback(
          endpoint === endpoints.GET_ADDITIONAL_DATA
            ? response.data[0]
            : endpoint === endpoints.GET_COUNTRY_DATA
            ? response.data[0]?.countries || response.data[0] || response.data
            : endpoint === endpoints.GET_CURRENCY_LIST
            ? response.data
            : []
        );
      }
    } catch (error) {
      console.log(`Error in fetching data from ${endpoint}`, error);
    }
  };

  const fetchAllData = async () => {
    await Promise.all([
      fetchData(endpoints.GET_ADDITIONAL_DATA, setAdditionalData),
      fetchData(endpoints.GET_COUNTRY_DATA, (data: any) => {
        console.log("Fetched country data:", data);
        setcountryData(data);
      }),
      fetchData(endpoints.GET_CURRENCY_LIST, setcurrencyData),
    ]);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
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

  const onSubmit = async () => {
    try {
      const { response, error } = await createOrganization(
        endpoints.CREATE_ORGANIZATION,
        inputData
      );
      if (response && !error) {
        toast.success(response.data.message);
        console.log(response , )
      } else {
        toast.error(error.response?.data?.message );
      }
    } catch (err) {
      console.error("Unexpected error submitting data:", err);
    }
  };

  const handleInputChange = (name: string, value: any) => {
    setInputData((prevDetails: any) => ({
      ...prevDetails,
      [name]: value,
    }));
    setValue(name as keyof InputData, value);
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

  console.log(inputData, "inputData");

  const fetchOrganization = async () => {
    try {
      const url = `${endpoints.GET_ONE_ORGANIZATION}`;
      const { response, error } = await getOneOrganization(url);

      if (!error && response) {
        Object.keys(response.data).forEach((key) => {
          setValue(key as keyof InputData, response.data[key]);
        });
        setInputData((prevDetails: any) => ({
          ...prevDetails,
          ...response.data,
        }));
        console.log(response.data, "Organization data fetched");
      }
    } catch (error) {
      console.log("Error in fetching Organization", error);
    }
  };

  useEffect(() => {
    fetchOrganization();
  }, []);

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
              <button onClick={handleDeleteImage}>
                {" "}
                <Trash color={"darkRed"} />
              </button>
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
                onChange: (e) =>
                  handleInputChange("organizationName", e.target.value),
              })}
            />

            <Select
              required
              placeholder="Select Country"
              error={errors.organizationCountry?.message}
              label="Organization Location"
              options={
                countryData?.map((country: any) => ({
                  value: country.name,
                  label: country.name,
                })) || []
              }
              onChange={(value: string) => {
                handleInputChange("organizationCountry", value);
              }}
              value={watch("organizationCountry")}
            />

            <Select
              required
              placeholder="Select Industry"
              error={errors.organizationIndustry?.message}
              onChange={(value: string) => {
                handleInputChange("organizationIndustry", value);
              }}
              value={watch("organizationIndustry")}
              label="Organization Industry"
              options={
                additionalData?.industry?.map((industry: any) => ({
                  value: industry,
                  label: industry,
                })) || []
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-x-4 mt-3 space-y-3">
            <Input
              label="Organization Address"
              placeholder="Street 1"
              error={errors.addline1?.message}
              {...register("addline1")}
              onChange={(e) => handleInputChange("addline1", e.target.value)}
              value={watch("addline1")}
            />

            <div className="pt-2.5">
              <Input
                label=""
                placeholder="Street 2"
                error={errors.addline2?.message}
                {...register("addline2")}
                onChange={(e) => handleInputChange("addline2", e.target.value)}
                value={watch("addline2")}
              />
            </div>
            <Input
              label="City"
              placeholder="Enter City"
              error={errors.city?.message}
              {...register("city")}
              onChange={(e) => handleInputChange("city", e.target.value)}
              value={watch("city")}
            />
            <Input
              label="Pin / Zip / Post Code"
              placeholder="Pin / Zip / Post Code"
              error={errors.pincode?.message}
              {...register("pincode")}
              onChange={(e) => handleInputChange("pincode", e.target.value)}
              value={watch("pincode")}
            />

            <Select
              required
              placeholder="Select State / Region / County"
              error={errors.state?.message}
              onChange={(value: string) => {
                handleInputChange("state", value);
              }}
              label="State / Region / County"
              options={stateList.map((state: any) => ({
                value: state,
                label: state,
              }))}
              value={watch("state")}
            />

            <PhoneNumberInput
              label="Phone"
              name="organizationPhNum"
              error={errors.organizationPhNum?.message}
              placeholder="Enter phone number"
              value={inputData.organizationPhNum}
              onChange={(value) => {
                handleInputChange("organizationPhNum", value);
              }}
              country={inputData.organizationCountry}
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
            onChange={(e) => {
              handleInputChange("website", e.target.value);
            }}
            value={watch("website")}
          />
        </div>

        <p className="mt-4 text-text_tertiary ">
          <b>Financial Settings</b>
        </p>

        <div className="bg-white p-5 rounded-lg mt-2 grid grid-cols-2 gap-4">
          <Select
            required
            placeholder="Select Currency"
            error={errors.baseCurrency?.message}
            onChange={(value) => {
              handleInputChange("baseCurrency", value);
            }}
            label="Base Currency"
            options={currencyData?.map((currency: any) => ({
              value: currency.currencyCode,
              label: currency.currencyName + " (" + currency.currencyCode + ")",
            }))}
            value={watch("baseCurrency")}
          />

          <Select
            value={watch("fiscalYear")}
            required
            placeholder="Select Financial Year"
            error={errors.fiscalYear?.message}
            onChange={(value) => {
              handleInputChange("fiscalYear", value);
            }}
            label="Financial Year"
            options={
              additionalData?.financialYear?.map((financialYear: any) => ({
                value: financialYear,
                label: financialYear,
              })) || []
            }
          />
        </div>

        <p className="mt-4 text-text_tertiary ">
          <b>Preferences </b>
        </p>

        <div className="grid grid-cols-12 gap-4 bg-white p-5 rounded-lg mt-2">
            <div className="col-span-8">
            <Select
              required
              placeholder="Select Time zone"
              error={errors.timeZone?.message}
              onChange={(value: string) => {
              handleInputChange("timeZone", value);
              const selectedTimezone = additionalData?.timezones?.find(
                (timezone: any) => timezone.zone === value
              );
              handleInputChange("timeZoneExp", selectedTimezone?.timeZone || "");
              }}
              label="Time Zone"
              options={
              additionalData?.timezones?.map((timezone: any) => ({
                value: timezone.zone,
                label: timezone.zone + " - " + timezone.description,
              })) || []
              }
              value={watch("timeZone")}
            />
            </div>
          <div className="col-span-8">
            <Select
              required
              placeholder="Select Date Format"
              error={errors.dateFormat?.message}
              onChange={(value: string) =>
                handleInputChange("dateFormat", value)
              }
              label="Date Format"
              options={
                [
                  ...(additionalData?.dateFormats?.short || []),
                  ...(additionalData?.dateFormats?.medium || []),
                  ...(additionalData?.dateFormats?.long || []),
                ].map((dateFormat: any) => ({
                  value: dateFormat.format,
                  exp:dateFormat.dateFormat,
                  label: dateFormat.format,
                })) || []
              }
              value={watch("dateFormat")}
            />
          </div>
          <div className="col-span-4 pt-6">
            <Select
              placeholder="Select Date Split"
              error={errors.dateSplit?.message}
              onChange={(value: string) =>
                handleInputChange("dateSplit", value)
              }
              label=""
              options={
                additionalData?.dateSplit?.map((dateSplit: any) => ({
                  value: dateSplit,
                  label: dateSplit,
                })) || []
              }
              value={watch("dateSplit")}
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
