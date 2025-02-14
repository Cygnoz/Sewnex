import { useEffect, useRef, useState } from "react";
import Button from "../../../Components/Button"
import Modal from "../../../Components/modal/Modal"
import accountsBgImage from "../../../assets/images/accountsBgIMage.png"
import Input from "../../../Components/Form/Input";
import CheveronDown from "../../../assets/icons/CheveronDown";
import CirclePlus from "../../../assets/icons/CirclePlus";
import useApi from "../../../Hooks/useApi";
import { endpoints } from "../../../Services/apiEdpoints";
import toast from "react-hot-toast";
import chartOfAcc from "../../../assets/constants/ChartOfAcc";
import EditIcon from "../../../assets/icons/EditIcon";
import Checkbox from "../../../Components/Form/Checkbox";

type Props = {
  accountData: any;
  page?: string;
  fetchAllAccounts: () => void;
}

const initialFormValues: any = {
  accountName: "",
  accountCode: "",
  accountSubhead: "",
  accountHead: "",
  accountGroup: "",
  description: "",
  bankAccNum: "",
  bankIfsc: "",
  bankCurrency: "",
  debitOpeningBalance: "",
  creditOpeningBalance: "",
  parentAccountId: "",
};

function NewAccountModal({ page, accountData, fetchAllAccounts }: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const { request: NewAccount } = useApi("post", 5001);
  const { request: EditAccount } = useApi("put", 5001);

  const [openingType, setOpeningType] = useState("Debit");
  const [formValues, setFormValues] = useState(initialFormValues);
  const [isSubAccount, setIsSubAccount] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const [AllAccountz, setAllAccountz] = useState<any>([]);

  const { request: fetchAllAccountz } = useApi("get", 5001);

  const accountCategories = {
    Asset: {
      Asset: ["Current Asset", "Non-Current Asset"],
    },
    Equity: {
      Equity: ["Equity"],
    },
    Income: {
      Income: ["Sales", "Indirect Income"],
    },
    Liability: {
      Liabilities: ["Current Liability", "Non-Current Liability"],
    },
    Expenses: {
      Expenses: ["Direct Expense", "Cost of Goods Sold", "Indirect Expense"],
    },
  };

  useEffect(() => {
    getAccountsData();
  }, []);

  useEffect(() => {
    if (page === "Edit" && accountData) {
      setFormValues(accountData);
      if (accountData.parentAccountId) {
        setIsSubAccount(true);
      } else {
        setIsSubAccount(false);
      }
      setOpeningType(accountData.debitOpeningBalance ? "Debit" : "Credit");
    }
  }, [page, accountData, isModalOpen]);

  const getAccountsData = async () => {
    try {
      const url = `${endpoints.Get_ALL_Acounts}`;
      const { response, error } = await fetchAllAccountz(url);
      if (!error && response) {
        setAllAccountz(response.data);
      } else {
        console.error("Failed to fetch account data.");
      }
    } catch (error) {
      toast.error("Error in fetching data.");
      console.error("Error in fetching data", error);
    }
  };

  const headGroup = (accountSubhead: string) => {
    for (const [group, heads] of Object.entries(accountCategories)) {
      for (const [head, subheads] of Object.entries(heads)) {
        if (subheads.includes(accountSubhead)) {
          const accountGroup =
            group === "Asset" || group === "Income" || group === "Equity"
              ? "Asset"
              : group === "Liability" || group === "Expenses"
                ? "Liability"
                : group;
          return { accountHead: head, accountGroup };
        }
      }
    }
    return null;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox" && name === "returnableItem") {
      const target = e.target as HTMLInputElement;
      setIsSubAccount(target.checked);
      if (!target.checked) {
        setFormValues((prev: any) => ({
          ...prev,
          parentAccountId: "",
        }));
      }
      return;
    }

    if (name === "accountSubhead") {
      const result = headGroup(value);
      if (result) {
        setFormValues((prevFormValues: any) => ({
          ...prevFormValues,
          accountSubhead: value,
          accountHead: result.accountHead,
          accountGroup: result.accountGroup,
          parentAccountId: "",
        }));
      } else {
        setFormValues((prevFormValues: any) => ({
          ...prevFormValues,
          accountSubhead: value,
          accountHead: "",
          accountGroup: "",
          parentAccountId: "",
        }));
      }
    } else if (name === "openingType") {
      setOpeningType(value);
      setFormValues((prevFormValues: any) => ({
        ...prevFormValues,
        debitOpeningBalance:
          value === "Debit" ? prevFormValues.debitOpeningBalance : "",
        creditOpeningBalance:
          value === "Credit" ? prevFormValues.creditOpeningBalance : "",
      }));
    } else if (name === "openingBalance") {
      if (parseFloat(value) < 0) return;

      setFormValues((prevFormValues: any) => ({
        ...prevFormValues,
        debitOpeningBalance:
          openingType === "Debit" ? value : prevFormValues.debitOpeningBalance,
        creditOpeningBalance:
          openingType === "Credit"
            ? value
            : prevFormValues.creditOpeningBalance,
      }));
    } else {
      setFormValues((prevFormValues: any) => ({
        ...prevFormValues,
        [name]: value,
      }));
    }
  };

  const openModal = () => {
    if (page === "Edit" && accountData) {
      setFormValues(accountData);
      setIsSubAccount(!!accountData.parentAccountId);
      setOpeningType(accountData.debitOpeningBalance ? "Debit" : "Credit");
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormValues(initialFormValues);
    setIsSubAccount(false);
    setOpeningType("Debit");
    setShowValidationError(false);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formValues.accountSubhead) {
      toast.error("Please select an account type.");
      return;
    }

    if (isSubAccount && !formValues.parentAccountId) {
      setShowValidationError(true);
      toast.error("Please select a parent account.");
      return;
    }
    try {
      const url =
        page === "Edit"
          ? `${endpoints.EDIT_NEW_ACCOUNT}/${formValues._id}`
          : endpoints.Add_NEW_ACCOUNT;
      const API = page === "Edit" ? EditAccount : NewAccount;
      const body = formValues;
      const { response, error } = await API(url, body);
      if (!error && response) {
        toast.success(response.data.message);
        closeModal();
        fetchAllAccounts();
      }
      else {
        toast.error(error.response.data.message);

      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Failed to add account"
      );
    }
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handleExternalSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setIsSubAccount(checked);
  };

  return (
    <div>
      {page === "Edit" ? (
        <div onClick={openModal} className="cursor-pointer">
          <EditIcon color={"#C88000"} />
        </div>
      ) : (
        <Button onClick={openModal}>
          <CirclePlus />
          <p> New Account</p>
        </Button>
      )}

      <Modal open={isModalOpen} onClose={closeModal} className="w-[50%] text-start px-7 py-6">

        <div
          className="mt-4 p-6 rounded-2xl flex justify-between items-center relative bg-cover bg-no-repeat bg-right"
          style={{
            backgroundImage: `url(${accountsBgImage})`,
          }}
        >
          <div className="relative flex-1">
            <p className="text-[#004D4D] font-bold text-base">Account Details</p>
            <p className="text-text_tertiary text-xs mt-2">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
        </div>


        <div className="mt-4 bg-[#FAF7F2] p-4 rounded-2xl text-text_tertiary text-sm">
          <form ref={formRef} onSubmit={onSubmit}>
            <div className="flex flex-col">
              <label className="mb-1">Account type</label>
              <div className="relative w-full">
                <select
                  name="accountSubhead"
                  value={formValues.accountSubhead}
                  onChange={handleChange}
                  className="w-full border border-inputBorder rounded-full p-2 pl-4 outline-none text-sm appearance-none pr-10"
                >
                  <option disabled hidden value="">
                    Select type
                  </option>
                  {chartOfAcc.map((item, index) => (
                    <optgroup className="text-maroon" key={index} label={item.head}>
                      {item.subhead.map((subitem, subindex) => (
                        <option className="text-black option-spacing" key={subindex} value={subitem}>
                          {subitem}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <CheveronDown strokeWidth="1.2" color="#495160" />
                </div>
              </div>
            </div>


            <div className="mt-4 flex items-center justify-between w-full">
              <div className="w-[48%]">
                <p className="mb-2">Account Name</p>
                <Input
                  name="accountName"
                  value={formValues.accountName}
                  onChange={handleChange}
                  placeholder={
                    formValues?.accountSubhead === "Credit Card"
                      ? "Enter Credit Card Name"
                      : "Enter Account Name"
                  } />
              </div>
              <div className="flex flex-col w-[48%]">
                <label className="mb-1">Account Code</label>
                <Input
                  name="accountCode"
                  value={formValues.accountCode}
                  onChange={handleChange}
                  placeholder="Enter Account Code"
                />
              </div>
            </div>
            {formValues.accountSubhead &&
              ![
                "Other Asset",
                "Bank",
                "Payment Clearing",
                "Credit Card",
                "Other Liability",
                "Overseas Tax Payable",
                "Other Income",
                "Other Expense",
              ].includes(formValues.accountSubhead) && (
                <>
                  <div className="mb-2 mt-4 flex items-center gap-1 text-textColor">
                    <Checkbox
                      id="checkbox3"
                      name="returnableItem"
                      checked={isSubAccount}
                      onChange={handleCheckboxChange}
                      className="w-5 h-5 mx-1 my-1 mt-1.5"
                    />
                    <label
                      htmlFor="checkbox3"
                      className="text-dropdownText text-sm font-medium cursor-pointer"
                    >
                      Make this a sub-account
                    </label>
                  </div>

                  {isSubAccount && (
                    <div className="mb-4">
                      <label
                        htmlFor="parentAccountId"
                        className="text-slate-600 text-sm flex items-center gap-2 mb-1.5"
                      >
                        Parent Account
                      </label>
                      <div className="relative w-full">
                        <select
                          className={`block appearance-none w-full mt-0.5 text-zinc-400 bg-white border text-sm h-9 pl-3 pr-8 rounded-full leading-tight focus:outline-none ${showValidationError
                            ? "border-red-500"
                            : "border-inputBorder"
                            }`}
                          name="parentAccountId"
                          onChange={(e) => {
                            const selectedAccountName = e.target.value;
                            const selectedAccount = AllAccountz?.find(
                              (account: any) =>
                                account.accountName === selectedAccountName
                            );
                            const selectedId = selectedAccount
                              ? selectedAccount._id
                              : "";
                            setFormValues((prevFormValues: any) => ({
                              ...prevFormValues,
                              parentAccountId: selectedId,
                            }));
                            setShowValidationError(false);
                          }}
                          value={
                            AllAccountz?.find(
                              (account: any) =>
                                account._id === formValues.parentAccountId
                            )?.accountName || ""
                          }
                        >
                          <option value="">Select Parent Account</option>
                          {AllAccountz?.filter(
                            (account: any) =>
                              account.accountSubhead ===
                              formValues.accountSubhead
                          )?.map((account: any) => (
                            <option
                              key={account._id}
                              value={account.accountName}
                            >
                              {account.accountName}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <CheveronDown strokeWidth="1.2" color="#495160" />
                        </div>
                      </div>
                      {showValidationError && (
                        <div className="text-red-500 text-xs mt-1">
                          Please select a parent account.
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}


            <div className="mt-4">
              <label className="block mb-2 text-labelColor text-sm">Opening Balance</label>
              <div className="flex">
                <div className="relative w-24 ">
                  <select
                    className="block appearance-none cursor-pointer w-full h-9 text-[#818894] bg-white border border-borderColor 
                                   text-sm pl-3.5 pr-2 rounded-l-full leading-tight 
                                   focus:outline-none"
                    name="openingType"
                    value={openingType}
                    onChange={handleChange}
                  >
                    <option value="Debit">Dr</option>
                    <option value="Credit">Cr</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CheveronDown strokeWidth="1.2" color="#495160" />
                  </div>
                </div>
                <input
                  type="number"
                  min={0}
                  className="text-xs w-[100%] rounded-r-full text-start bg-white border border-borderColor h-9 py-2 px-3 focus:outline-none"
                  placeholder="Enter Opening Balance"
                  name="openingBalance"
                  value={
                    openingType === "Debit"
                      ? formValues.debitOpeningBalance
                      : formValues.creditOpeningBalance
                  }
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-4">
              <p className="mb-2">Description</p>
              <Input
                name="description"
                value={formValues.description}
                onChange={handleChange}
                placeholder="Enter Description"
                size="lg" />
            </div>


          </form>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={closeModal} variant="secondary" className="text-sm font-semibold">
            Cancel
          </Button>
          <Button onClick={handleExternalSubmit}>Save</Button>
        </div>


      </Modal>
    </div>
  )
}

export default NewAccountModal