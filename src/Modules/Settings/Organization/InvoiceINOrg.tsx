import { useState } from "react";
import Banner from "./Banner";
import ChevronRight from "../../../assets/icons/ChevronRight";
import Modal from "../../../Components/modal/Modal";
import Button from "../../../Components/Button";
import Plus from "../../../assets/icons/Plus";
import QrCode from "../../../assets/images/Frame 629654.png";
import Qrsign from "../../../assets/images/web_13861773 1.png";
import twitterLogo from "../../../assets/images/twitter-logo-2 logo.png";
import instagramLogo from "../../../assets/images/instagram logo.png";
import linkedinlog from "../../../assets/images/linkedin logo.png";
import facebooklogo from "../../../assets/images/Group.png";
import Checkbox from "../../../Components/Form/Checkbox";
import Input from "../../../Components/Form/Input";
import CirclePlus from "../../../assets/icons/CirclePlus";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface InvoiceSettings {
  organizationAddressFormat?: string;
  qrLocation?: string;
  displayQrLocation?: boolean;
  qrPayment?: string;
  displayQrPayment?: boolean;
  digitalSignature?: string;
  displayDigitalSignature?: boolean;
  xLink?: string;
  displayXLink?: boolean;
  instagramLink?: string;
  displayInstagramLink?: boolean;
  linkedinLink?: string;
  displayLinkedinLink?: boolean;
  facebookLink?: string;
  displayFacebookLink?: boolean;
  accountHolderName?: string;
  displayAccountHolderName?: boolean;
  bankName?: string;
  displayBankName?: boolean;
  accNum?: string;
  displayAccNum?: boolean;
  ifsc?: string;
  displayIfsc?: boolean;
  defaultTermsAndCondition?: string;
}

const InvoiceINOrg = () => {
  const [isOrganisationAddressOpen, setOrganisationAddressOpen] =
    useState<boolean>(true);
  const [isAddPlaceHolderOpen, setAddPlaceHolderOpen] = useState(false);
  const [isSeePreviewOpen, setSeePreviewOpen] = useState(false);
  const [showQROpenLocation, setShowQROpenLocation] = useState(false);
  const [showQROpenPayment, setShowQROpenPayment] = useState(false);
  const [showSignOpen, setShowSignOpen] = useState(false);
  const [invoiceSettings, setInvoiceSettings] = useState<InvoiceSettings>({
    organizationAddressFormat: "${ORGANIZATION.CITY}",
    qrLocation: "",
    displayQrLocation: false,
    qrPayment: "",
    displayQrPayment: false,
    digitalSignature: "",
    displayDigitalSignature: false,
    xLink: "",
    displayXLink: false,
    instagramLink: "",
    displayInstagramLink: false,
    linkedinLink: "",
    displayLinkedinLink: false,
    facebookLink: "",
    displayFacebookLink: false,
    accountHolderName: "",
    displayAccountHolderName: false,
    bankName: "",
    displayBankName: false,
    accNum: "",
    displayAccNum: false,
    ifsc: "",
    displayIfsc: false,
    defaultTermsAndCondition: "",
  });

  const organizationDetails = [
    "${ORGANIZATION.CITY} ${ORGANIZATION.STATE} ${ORGANIZATION.POSTAL_CODE}",
    "${ORGANIZATION.COUNTRY}",
    "${ORGANIZATION.GSTNO_LABEL} ${ORGANIZATION.GSTNO_VALUE}",
    "${ORGANIZATION.PHONE}",
    "${ORGANIZATION.EMAIL}",
    "${ORGANIZATION.WEBSITE}",
  ];
  const organisationAddress = [
    "Street Adress 1",
    "Fax",
    "Street Adress 1",
    "Phone Label",
    "Organization Name",
    "City",
    "Email",
    "State/Province",
    "Website",
    "Country",
    "Zip/Postal Code",
    "Fax Label",
  ];
  const previewList = [
    "Kerala",
    "India",
    "GSTIN 32f4565464",
    "6233494546",
    "Dheeraj@",
  ];

  const validationSchema = yup.object({
    organizationAddressFormat: yup.string().optional(),
    qrLocation: yup.string().optional(),
    displayQrLocation: yup.boolean().optional(),
    qrPayment: yup.string().optional(),
    displayQrPayment: yup.boolean().optional(),
    digitalSignature: yup.string().optional(),
    displayDigitalSignature: yup.boolean().optional(),
    xLink: yup.string().url("Must be a valid URL").optional(),
    displayXLink: yup.boolean().optional(),
    instagramLink: yup.string().url("Must be a valid URL").optional(),
    displayInstagramLink: yup.boolean().optional(),
    linkedinLink: yup.string().url("Must be a valid URL").optional(),
    displayLinkedinLink: yup.boolean().optional(),
    facebookLink: yup.string().url("Must be a valid URL").optional(),
    displayFacebookLink: yup.boolean().optional(),
    accountHolderName: yup.string().optional(),
    displayAccountHolderName: yup.boolean().optional(),
    bankName: yup.string().optional(),
    displayBankName: yup.boolean().optional(),
    accNum: yup.string().optional(),
    displayAccNum: yup.boolean().optional(),
    ifsc: yup.string().optional(),
    displayIfsc: yup.boolean().optional(),
    defaultTermsAndCondition: yup.string().optional(),
  });

  const {
    register,
    watch,
    setValue,
    formState: {  },
  } = useForm<InvoiceSettings>({
    resolver: yupResolver(validationSchema),
  });

  const encodeFileToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  console.log(invoiceSettings, "qwertyu");

  const openModal = (
    placeholder = false,
    seePreview = false,
    showQRLocation = false,
    showSign = false,
    showQRPayment = false
  ) => {
    setAddPlaceHolderOpen(placeholder);
    setSeePreviewOpen(seePreview);
    setShowQROpenLocation(showQRLocation);
    setShowSignOpen(showSign);
    setShowQROpenPayment(showQRPayment);
  };

  const closeModal = (
    placeholder = false,
    seePreview = false,
    showQRLocation = false,
    showSign = false,
    showQRPayment = false
  ) => {
    setAddPlaceHolderOpen(placeholder);
    setSeePreviewOpen(seePreview);
    setShowQROpenLocation(showQRLocation);
    setShowSignOpen(showSign);
    setShowQROpenPayment(showQRPayment);
  };

  const handleFileChange = async (e: any, type: any) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await encodeFileToBase64(file);
      console.log(base64);

      setInvoiceSettings((prevState) => ({
        ...prevState,
        [type]: base64,
      }));
    }
  };

  const handleEventBindChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    varName: string
  ) => {
    const value = event.target.value; // Get the string value from the input
    setInvoiceSettings((prevState) => ({
      ...prevState,
      [varName]: value, // Update the correct property
    }));
  };

  const handleRadioChange = (
    checked: boolean,
    varName: keyof InvoiceSettings
  ) => {
    setInvoiceSettings((prevState) => ({
      ...prevState,
      [varName]: checked,
    }));
    setValue(varName, checked);
  };

  return (
    <div className=" overflow-y-scroll hide-scrollbar h-[100vh]">
      <Banner />

      <div className="my-4">
        <div className="h-14 flex items-center px-5 rounded-lg justify-between bg-white">
          <p className="font-bold text-[#303F58]">
            Organizational Address Format
          </p>
          <button onClick={() => setOrganisationAddressOpen((prev) => !prev)}>
            <ChevronRight
              color="#4B5C79"
              className={`  transition-transform duration-500 ${
                isOrganisationAddressOpen ? "rotate-90" : ""
              } ease-in-out cursor-pointer`}
            />
          </button>
        </div>
      </div>
      <div
        className={`col-span-7 rounded-lg bg-white overflow-hidden transition-max-height duration-500 ease-in-out  ${
          isOrganisationAddressOpen ? "mt-5 space-y-3" : "max-h-0"
        }`}
        style={{ minHeight: isOrganisationAddressOpen ? "225px" : "0" }}
      >
        <div className="m-4 space-y-3">
          <button
            onClick={() => openModal(true, false)}
            className="text-[#004D4D] flex items-center space-x-1 font-bold text-xs cursor-pointer"
          >
            <p>Insert Placeholders</p>
            <CirclePlus color="#004D4D" size={14} />
          </button>
          <Modal
            open={isAddPlaceHolderOpen}
            onClose={() => closeModal()}
            style={{ width: "497px", padding: "12px" }}
          >
            <div className="grid grid-cols-2 gap-2">
              {organisationAddress.map((address) => (
                <div
                  key={address}
                  className="p-2  rounded hover:bg-[#F3E6E6] cursor-pointer"
                >
                  {address}
                </div>
              ))}
            </div>
          </Modal>
          <div className="p-3 text-xs text-[#303F58]  bg-[#F4F4F4]">
            {organizationDetails.map((data) => (
              <p key={data} className="text-[12px]">
                {data}
              </p>
            ))}
          </div>
          <button
            onClick={() => openModal(false, true)}
            className="text-center text-[#004D4D] text-[12px] font-bold cursor-pointer "
          >
            See Preview
          </button>
          <Modal
            open={isSeePreviewOpen}
            onClose={() => closeModal()}
            style={{ width: "298px", padding: "12px" }}
          >
            <div className="flex justify-between">
              <div className="space-y-1">
                {previewList.map((list) => (
                  <p>{list}</p>
                ))}
              </div>
              <p
                onClick={() => closeModal()}
                className="text-[20px] cursor-pointer"
              >
                &times;
              </p>
            </div>
          </Modal>
        </div>
      </div>

      <div className="space-y-3 ">
        <p className="font-bold text-[#303F58]">QR code Location</p>
        <div className="text-[text-[#354157]">
          <label>
            <div className="rounded-md p-5 bg-white grid grid-cols-12 gap-4 cursor-pointer">
              <div className="col-span-10 flex">
                <div className="w-20 h-20 rounded-md flex items-center justify-center bg-[#F7E7CE]">
                  <img src={QrCode} alt="Default QR Code Type 1" />
                </div>
                <div className="ms-3 flex items-center h-full text-[#303F58] ">
                  <div className="space-y-2">
                    <p>
                      <b>Upload Organization's Location QR Code</b>
                    </p>
                    <p className="text-xs">
                      Upload or configure the location of your QR code on the
                      invoice
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-end gap-8 ">
                {invoiceSettings.qrLocation && (
                  <button
                    onClick={() => openModal(false, false, true)}
                    className="h-[26px] text-[10px] text-text_tertiary px-1  border rounded-md flex items-center justify-center"
                  >
                    Show QR
                  </button>
                )}
                <div className="bg-[#004D4D] text-white items-center justify-center rounded-full flex h-8 w-8">
                  <Plus color="white" />
                </div>
              </div>
            </div>
            <input
              type="file"
              className="hidden"
              {...register("qrLocation")}
              value={watch("qrLocation")}
              onChange={(e) => handleFileChange(e, "qrLocation")}
            />
          </label>
          <Modal
            open={showQROpenLocation}
            onClose={() => closeModal()}
            style={{
              width: "360px",
              padding: "32px",
              borderRadius: "16px",
            }}
          >
            <div className="flex flex-col items-center justify-center space-y-6 my-6">
              <p className="w-[220px] text-center text-[#354157] text-[18px] font-bold">
                Organization’s Location QR Code
              </p>
              <div className="px-4 py-2 border border-[#ABABAB] rounded-lg">
                <img
                  src={invoiceSettings.qrLocation}
                  alt="QR Code Type 1"
                  width={150}
                />
              </div>
              <div className="flex items-center gap-4">
                <label htmlFor="qrLocation" className="cursor-pointer">
                  <Button variant="primary">
                    <p className="text-xs font-medium text-white">Replace QR</p>
                  </Button>
                  <input
                    type="file"
                    id="qrLocation"
                    className="hidden"
                    {...register("qrLocation")}
                    value={watch("qrLocation")}
                    onChange={(e) => handleFileChange(e, "qrLocation")}
                  />
                </label>
                <Button onClick={() => closeModal()} variant="secondary">
                  <p className="text-xs font-medium ">Close</p>
                </Button>
              </div>
            </div>
          </Modal>
        </div>
        <Checkbox
          label="Display QR Code in invoice"
          checked={watch("displayQrLocation")}
          onChange={(checked) =>
            handleRadioChange(checked, "displayQrLocation")
          }
        />
      </div>

      {/* QR code Payment */}
      <div className="space-y-3 mt-1 text-[#303F58]">
        <p className="font-bold">QR code Payment</p>
        <div>
          <label>
            <div className="rounded-md p-5 bg-white grid grid-cols-12 gap-4 cursor-pointer">
              <div className="col-span-10 flex">
                <div className="w-20 h-20 rounded-md flex items-center justify-center bg-[#F7E7CE]">
                  <img src={QrCode} alt="" />
                </div>
                <div className="ms-3 flex items-center h-full">
                  <div className="space-y-2">
                    <p>
                      <b>Upload Payment Based QR Code</b>
                    </p>
                    <p className="text-xs">
                      Upload Payment Based QR Code on the Invoice
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-end gap-8">
                {invoiceSettings.qrPayment && (
                  <button
                    onClick={() => openModal(false, false, false, false, true)}
                    className="h-[26px] text-xs text-text_tertiary px-1  border rounded-md flex items-center justify-center"
                  >
                    <p className=" text-[10px] font-medium">Show QR</p>
                  </button>
                )}
                <div className="bg-[#004D4D] text-white items-center justify-center rounded-full flex h-8 w-8">
                  <Plus color="white" />
                </div>
              </div>
            </div>
            <input
              type="file"
              className="hidden"
              {...register("qrPayment")}
              value={watch("qrPayment")}
              onChange={(e) => handleFileChange(e, "qrPayment")}
            />
          </label>
          <Modal
            open={showQROpenPayment}
            onClose={() => closeModal()}
            style={{
              width: "360px",
              padding: "32px",
              borderRadius: "16px",
            }}
          >
            <div className="flex flex-col items-center justify-center space-y-6 my-6">
              <p className="w-[220px] text-center text-[18px] font-bold">
                Payment Based QR Code
              </p>
              <div className="px-4 py-2 border border-[#ABABAB] rounded-lg">
                <img
                  src={invoiceSettings.qrPayment}
                  alt="QR Code Type 1"
                  width={150}
                />
              </div>
              <div className="flex items-center gap-4">
                <label htmlFor="qrPayment" className="cursor-pointer">
                  <Button variant="primary">
                    <p className="text-xs font-medium text-white">Replace QR</p>
                  </Button>
                  <input
                    type="file"
                    id="qrPayment"
                    className="hidden"
                    {...register("qrPayment")}
                    value={watch("qrPayment")}
                    onChange={(e) => handleFileChange(e, "qrPayment")}
                  />
                </label>
                <Button onClick={() => closeModal()} variant="secondary">
                  <p className="text-xs font-medium ">Close</p>
                </Button>
              </div>
            </div>
          </Modal>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            label="Display QR Code in invoice"
            checked={invoiceSettings.displayQrPayment}
            onChange={(checked) =>
              handleRadioChange(checked, "displayQrPayment")
            }
          />
        </div>
      </div>

      {/* Invoice Signatory */}
      <div className="space-y-3 mt-1 text-[#303F58]">
        <p className="font-bold">Invoice Signatory</p>
        <div>
          <label>
            <div className="rounded-md p-5 bg-white grid grid-cols-12 gap-4 cursor-pointer">
              <div className="col-span-10 flex">
                <div className="w-20 h-20 rounded-md flex items-center justify-center bg-[#F7E7CE]">
                  <img src={Qrsign} alt="Default Signature" />
                </div>
                <div className="ms-3 flex items-center h-full">
                  <div className="space-y-2">
                    <p>
                      <b>Upload Organisation Digital Signature</b>
                    </p>
                    <p className="text-xs">
                      Upload the digital signature of the person authorized to
                      sign invoices
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-end gap-8">
                {invoiceSettings.digitalSignature && (
                  <button
                    onClick={() => openModal(false, false, false, true)}
                    className="h-[26px] text-xs text-text_tertiary px-1  border rounded-md flex items-center justify-center"
                  >
                    <p className="text-[10px] font-medium">Show Sign</p>
                  </button>
                )}
                <div className="bg-[#004D4D] text-white items-center justify-center rounded-full flex h-8 w-8">
                  <Plus color="white" />
                </div>
              </div>
            </div>
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange(e, "digitalSignature")}
            />
          </label>
          <Modal
            open={showSignOpen}
            onClose={() => closeModal()}
            style={{
              width: "360px",
              padding: "32px",
              borderRadius: "16px",
            }}
          >
            <div className="flex flex-col items-center justify-center space-y-6 my-6">
              <p className="w-[220px] text-center text-[18px] font-bold">
                Organization’s Digital Signature
              </p>
              <div className="px-4 py-2 border border-[#ABABAB] rounded-lg">
                <img
                  src={invoiceSettings.digitalSignature}
                  alt="Digital Signature"
                  width={150}
                />
              </div>
              <div className="flex items-center gap-4">
                <label htmlFor="digitalSignature" className="cursor-pointer">
                  <Button variant="primary">
                    <p className="text-xs font-medium ">Replace Sign</p>
                  </Button>
                  <input
                    type="file"
                    id="digitalSignature"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "digitalSignature")}
                  />
                </label>
                <Button onClick={() => closeModal()} variant="secondary">
                  <p className="text-xs font-medium ">Close</p>
                </Button>
              </div>
            </div>
          </Modal>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            label="Display QR Code in invoice"
            checked={invoiceSettings.displayDigitalSignature}
            onChange={(checked) =>
              handleRadioChange(checked, "displayDigitalSignature")
            }
          />
        </div>
      </div>

      <p className=" my-4 text-[#303F58]">
        <b>Add Social Media</b>
      </p>
      <div className="rounded-md p-5 bg-white text-[#303F58]">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="" className="text-slate-600">
              Twitter
            </label>
            <div className="flex gap-2 items-center justify-center">
              <div className="flex items-center justify-center align-middle bg-slate-100 p-2 h-10 rounded-md mt-2">
                <img width={25} src={twitterLogo} alt="" />
              </div>
              <input
                type="text"
                placeholder="Add X Link"
                onChange={(e) => handleEventBindChange(e, "xLink")}
                value={invoiceSettings.xLink}
                className="pl-4 mt-3 text-xs w-[100%] rounded-md text-start bg-white border border-slate-300 h-[39px] p-2 focus:outline-none focus:ring-1 focus:ring-[#7E0D0B]"
                name="twitter"
              />

              {/* <img src={xMark} className="mt-3" alt="" /> */}
            </div>
            <div className="flex items-center space-x-2 mt-3">
              <Checkbox
                label="Display QR Code in invoice"
                checked={invoiceSettings.displayXLink}
                onChange={(checked) =>
                  handleRadioChange(checked, "displayXLink")
                }
              />
            </div>
          </div>

          <div>
            <label className="text-slate-600">Instagram</label>
            <div className="flex gap-2 items-center justify-center">
              <div className="flex items-center justify-center bg-slate-100 p-2 h-10 rounded-md mt-2">
                <img src={instagramLogo} alt="" />
              </div>
              <input
                type="text"
                placeholder="Add Instagram Link"
                className="pl-4 mt-3 text-xs w-[100%] rounded-md text-start bg-white border border-slate-300 h-[39px] p-2 focus:outline-none focus:ring-1 focus:ring-[#7E0D0B]"
                value={invoiceSettings.instagramLink}
                name="instagramLink"
                onChange={(e) => handleEventBindChange(e, "instagramLink")}
              />
              {/* <img src={xMark} className="mt-3" alt="" /> */}
            </div>
            <div className="flex items-center space-x-2 mt-3">
              <Checkbox
                label="Display QR Code in invoice"
                checked={invoiceSettings.displayInstagramLink}
                onChange={(checked) =>
                  handleRadioChange(checked, "displayInstagramLink")
                }
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="" className="text-slate-600">
              Linkedin
            </label>
            <div className="flex gap-2 items-center justify-center">
              <div className="flex items-center justify-center bg-slate-100 p-2 h-10 rounded-md mt-2">
                <img src={linkedinlog} alt="" />
              </div>
              <input
                type="text"
                placeholder="Add Linkedin Link"
                className="pl-4 mt-3 text-xs w-[100%] rounded-md text-start bg-white border border-slate-300 h-[39px] p-2 focus:outline-none focus:ring-1 focus:ring-[#7E0D0B]"
                name="linkedin"
                onChange={(e) => handleEventBindChange(e, "linkedin")}
                value={invoiceSettings.linkedinLink}
              />
              {/* <img src={xMark} className="mt-3" alt="" /> */}
            </div>
            <div className="flex items-center space-x-2 mt-3">
              <Checkbox
                label="Display QR Code in invoice"
                checked={invoiceSettings.displayLinkedinLink}
                onChange={(checked) =>
                  handleRadioChange(checked, "displayLinkedinLink")
                }
              />
            </div>
          </div>

          <div>
            <label className="text-slate-600">Facebook</label>
            <div className="flex gap-2 items-center justify-center">
              <div className="flex items-center justify-center bg-slate-100 p-2 h-10 rounded-md mt-2">
                <img src={facebooklogo} alt="" />
              </div>
              <input
                type="text"
                placeholder="Add Facebook Link"
                className="pl-4 mt-3 text-xs w-[100%] rounded-md text-start bg-white border border-slate-300 h-[39px] p-2 focus:outline-none focus:ring-1 focus:ring-[#7E0D0B]"
                onChange={(e) => handleEventBindChange(e, "facebookLink")}
                value={invoiceSettings.facebookLink}
                name="facebook"
              />
              {/* <img src={xMark} className="mt-3" alt="" /> */}
            </div>
            <div className="flex items-center space-x-2 mt-3">
              <Checkbox
                label="Display QR Code in invoice"
                checked={invoiceSettings.displayFacebookLink}
                onChange={(checked) =>
                  handleRadioChange(checked, "displayFacebookLink")
                }
              />
            </div>
          </div>
        </div>
      </div>
      <p className="my-4 text-[#303F58]">
        <b>Add Payment Information</b>
      </p>
      <div className="bg-white rounded-md mt-4 p-5 text-[#303F58] ">
        <p className="my-4">
          <b>Enter Bank account Details</b>
        </p>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <Input
              placeholder="Enter Account Holder Name"
              label="Account Holder Name"
            />
            <div className="flex items-center space-x-2 mt-3">
              <Checkbox
                label="Display in invoice"
                checked={invoiceSettings.displayAccountHolderName}
                onChange={(checked) =>
                  handleRadioChange(checked, "displayAccountHolderName")
                }
              />
            </div>
          </div>

          <div>
            <Input placeholder="Enter Bank Name" label="Bank Name" />

            <div className="flex items-center space-x-2 mt-3">
              <Checkbox
                label="Display  in invoice"
                checked={invoiceSettings.displayBankName}
                onChange={(checked) =>
                  handleRadioChange(checked, "displayBankName")
                }
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <Input placeholder="Enter Account Number" label="Account Number" />

            <div className="flex items-center space-x-2 mt-3">
              <Checkbox
                label="Display  invoice"
                checked={invoiceSettings.displayAccNum}
                onChange={(checked) =>
                  handleRadioChange(checked, "displayAccNum")
                }
              />
            </div>
          </div>

          <div>
            <Input placeholder="Enter IFSC Code" label="IFSC" />

            <div className="flex items-center space-x-2 mt-3">
              <Checkbox
                label="Display in invoice"
                checked={invoiceSettings.displayIfsc}
                onChange={(checked) =>
                  handleRadioChange(checked, "displayIfsc")
                }
              />
            </div>
          </div>
        </div>
        <div />
      </div>
      <p className="font-bold text-textColor text-sm mt-3 text-[#303F58]">
        Terms & Condition
      </p>
      <div className="mt-4 p-6 rounded-lg bg-white">
        <textarea
          value={invoiceSettings.defaultTermsAndCondition}
          onChange={(e) => handleEventBindChange(e, "defaultTermsAndCondition")}
          className="w-full h-32 p-3 border border-inputBorder rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-[#7E0D0B]"
        />
      </div>
    </div>
  );
};

export default InvoiceINOrg;
