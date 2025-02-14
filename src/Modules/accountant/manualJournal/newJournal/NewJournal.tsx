import { Link, useNavigate, useParams } from "react-router-dom"
import BackIcon from "../../../../assets/icons/BackIcon"
import Input from "../../../../Components/Form/Input"
import { useEffect, useState } from "react"
import AccountDropdown from "./AccountDropdown"
import toast from "react-hot-toast"
import TrashIcon from "../../../../assets/icons/TrashIcon"
import Button from "../../../../Components/Button"
import journalBgImage from "../../../../assets/images/journalBgImage.png"
import CirclePlus from "../../../../assets/icons/CirclePlus"
import useApi from "../../../../Hooks/useApi"
import { useOrganization } from "../../../../Context/OrganizationContext"
import { endpoints } from "../../../../Services/apiEdpoints"
import CheveronDown from "../../../../assets/icons/CheveronDown"

type Props = { page?: string };

function NewJournal({ page }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { request: NewJournalAdd } = useApi("post", 5001);
  const { request: EditJournal } = useApi("put", 5001);
  const { request: GetLastJournelPrefix } = useApi("get", 5001);
  const { request: GetAllAcounts } = useApi("get", 5001);
  const { organization } = useOrganization()
  // Initialize with two non-deletable rows
  const initialTransactions = [
    {
      accountId: "",
      accountCode: "",
      accountName: "",
      debitAmount: 0,
      creditAmount: 0,
      description: "",
      contact: "",
    },
    {
      accountId: "",
      accountCode: "",
      accountName: "",
      debitAmount: 0,
      creditAmount: 0,
      description: "",
      contact: "",
    },
  ];


  const [accountOptions, setAccountOptions] = useState(null);
  const [totalResult, setTotalResult] = useState({
    totalDebit: 0,
    totalCredit: 0,
    difference: 0,
    differencesLabel: "",
  });
  const [newJournalDatas, setNewJournelDatas] = useState({
    journel: "",
    date: new Date().toISOString().split("T")[0],
    reference: "",
    note: "",
    cashBasedJournal: false,
    currency: "INR",
    transaction: initialTransactions,
    totalDebitAmount: 0,
    totalCreditAmount: 0,
  });
  console.log(newJournalDatas, "newJournalDatas");


  const tableHeaders = [
    "Account",
    "Description",
    // "Contact (INR)",
    "Debits",
    "Credits",
    "Actions",
  ];

  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState<boolean[]>(
    Array(initialTransactions.length).fill(false)
  );
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState<boolean[]>(
    Array(initialTransactions.length).fill(false)
  );
  const [accountSearch, setAccountSearch] = useState<string[]>(
    Array(initialTransactions.length).fill("")
  );
  const [contactSearch, setContactSearch] = useState<string[]>(
    Array(initialTransactions.length).fill("")
  );

  const addRow = () => {
    const newRow = {
      accountId: "",
      accountCode: "",
      accountName: "",
      debitAmount: 0,
      creditAmount: 0,
      description: "",
      contact: "",
    };

    setNewJournelDatas({
      ...newJournalDatas,
      transaction: [...newJournalDatas.transaction, newRow],
    });

    setIsAccountDropdownOpen([...isAccountDropdownOpen, false]);
    setIsContactDropdownOpen([...isContactDropdownOpen, false]);
    setAccountSearch([...accountSearch, ""]);
    setContactSearch([...contactSearch, ""]);
  };

  const deleteRow = (index: number) => {
    // Prevent deletion of rows at indices 0 and 1
    if (index < 2) return;

    setNewJournelDatas({
      ...newJournalDatas,
      transaction: newJournalDatas.transaction.filter(
        (_, rowIndex) => rowIndex !== index
      ),
    });

    setIsAccountDropdownOpen(
      isAccountDropdownOpen.filter((_, i) => i !== index)
    );
    setIsContactDropdownOpen(
      isContactDropdownOpen.filter((_, i) => i !== index)
    );
    setAccountSearch(accountSearch.filter((_, i) => i !== index));
    setContactSearch(contactSearch.filter((_, i) => i !== index));
  };

  // const contactOptions = ["John Doe", "Jane Smith", "Robert Brown"];

  const currencies = [
    { value: "INR", display: "INR - Indian Rupees" },
    { value: "USD", display: "USD - United States Dollar" },
    { value: "EUR", display: "EUR - Euro" },
    { value: "GBP", display: "GBP - British Pound Sterling" },
    { value: "JPY", display: "JPY - Japanese Yen" },
    { value: "AUD", display: "AUD - Australian Dollar" },
    { value: "CAD", display: "CAD - Canadian Dollar" },
    { value: "CHF", display: "CHF - Swiss Franc" },
    { value: "CNY", display: "CNY - Chinese Yuan" },
    { value: "NZD", display: "NZD - New Zealand Dollar" },
    { value: "SGD", display: "SGD - Singapore Dollar" },
    { value: "HKD", display: "HKD - Hong Kong Dollar" },
    { value: "KRW", display: "KRW - South Korean Won" },
    { value: "SEK", display: "SEK - Swedish Krona" },
    { value: "NOK", display: "NOK - Norwegian Krone" },
  ];

  const getLastJournelsPrefix = async () => {
    try {
      const url = `${endpoints.Get_LAST_Journel_Prefix}`;
      const { response, error } = await GetLastJournelPrefix(url);
      if (!error && response) {
        console.log("response", response);
        setNewJournelDatas({ ...newJournalDatas, journel: response?.data });
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const getAllAccounts = async () => {
    try {
      const url = `${endpoints.Get_ALL_Acounts}`;
      const { response, error } = await GetAllAcounts(url);
      if (!error && response) {
        setAccountOptions(response.data);
        console.log("All accounts", response);
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  useEffect(() => {
    getLastJournelsPrefix();
    getAllAccounts();
  }, []);

  useEffect(() => {
    if (!Array.isArray(newJournalDatas.transaction)) {
      return;
    }

    const totalDebit = newJournalDatas.transaction.reduce(
      (total, transaction) => {
        // Check if transaction is valid and has a debitAmount
        const debitAmount =
          typeof transaction.debitAmount === "string"
            ? parseFloat(transaction.debitAmount)
            : typeof transaction.debitAmount === "number"
              ? transaction.debitAmount
              : 0;
        return total + (isNaN(debitAmount) ? 0 : debitAmount);
      },
      0
    );

    const totalCredit = newJournalDatas.transaction.reduce(
      (total, transaction) => {
        // Check if transaction is valid and has a creditAmount
        const creditAmount =
          typeof transaction.creditAmount === "string"
            ? parseFloat(transaction.creditAmount)
            : typeof transaction.creditAmount === "number"
              ? transaction.creditAmount
              : 0;
        return total + (isNaN(creditAmount) ? 0 : creditAmount);
      },
      0
    );

    const difference = totalDebit - totalCredit;

    setTotalResult({
      totalDebit,
      totalCredit,
      difference,
      differencesLabel: difference < 0 ? "(Debit)" : "(Credit)",
    });

    setNewJournelDatas({
      ...newJournalDatas,
      totalCreditAmount: parseFloat(totalCredit.toFixed(2)),
      totalDebitAmount: parseFloat(totalDebit.toFixed(2)),
    });
  }, [newJournalDatas.transaction]);

  const handleAddNewJournel = async () => {
    const {
      journel,
      date,
      reference,
      note,
      currency,
      transaction,
      totalDebitAmount,
      totalCreditAmount,
    } = newJournalDatas;
    console.log(newJournalDatas);

    let errors = [];

    // Validate required fields
    if (!journel) errors.push("Journal");
    if (!date) errors.push("Date");
    if (!reference) errors.push("Reference");
    if (!note) errors.push("Note");
    if (!currency) errors.push("Currency");
    if (totalDebitAmount === undefined || totalCreditAmount === undefined) {
      errors.push("Total Debit and Credit Amounts");
    }
    if (totalResult && totalResult.difference) {
      errors.push("Ensure that the debit and credits are equal!");
    }

    // Validate minimum two transactions and fields in transactions
    if (transaction.length < 2) {
      errors.push("At least two transactions");
    }

    transaction.forEach((txn, index) => {
      if (!txn.accountId) errors.push(`Transaction ${index + 1}: Account ID`);
      if (txn.debitAmount === undefined && txn.creditAmount === undefined) {
        errors.push(`Transaction ${index + 1}: Debit or Credit Amount`);
      }
    });

    // Show detailed toast message if there are errors
    if (errors.length > 0) {
      toast.error(`Please fill the following fields: ${errors.join(", ")}`);
    } else {
      try {
        const url = page === "edit" ? `${endpoints.EDIT_JOURNAL}/${id}` : `${endpoints.Add_NEW_Journel}`;
        const apiRequest = page === "edit" ? EditJournal : NewJournalAdd
        const apiResponse = await apiRequest(url, newJournalDatas);
        console.log("api response", apiResponse);
        const { response, error } = apiResponse;
        if (!error && response) {
          toast.success(response.data.message);
          setNewJournelDatas({
            journel: "",
            date: "",
            reference: "",
            note: "",
            cashBasedJournal: false,
            currency: "INR",
            transaction: initialTransactions,
            totalDebitAmount: 0,
            totalCreditAmount: 0,
          });
          setTimeout(() => {
            navigate("/accountant/manualjournal");
          }, 100);
        } else {
          toast.error(error?.response.data.message);
          console.log("error", error);
        }
      } catch (error) {
        console.log("Error during API call", error);
      }
    }
  };

  const handleAccountSelect = (index: number, account: any) => {
    const newTransaction = [...newJournalDatas.transaction];

    // Set both accountName and accountId
    newTransaction[index].accountName = account.accountName;
    newTransaction[index].accountId = account._id; // Set accountId
    newTransaction[index].accountCode = account.accountCode;
    setNewJournelDatas({
      ...newJournalDatas,
      transaction: newTransaction,
    });
    setIsAccountDropdownOpen(
      isAccountDropdownOpen.map((open, i) => (i === index ? false : open))
    );
  };

  const handleAccountSearchChange = (index: number, value: string) => {
    const newSearch = [...accountSearch];
    newSearch[index] = value;
    setAccountSearch(newSearch);
  };

  const handleAccountDropdownToggle = (index: number, isOpen: boolean) => {
    setIsAccountDropdownOpen(
      isAccountDropdownOpen.map((open, i) => (i === index ? isOpen : open))
    );
  };


  const clearAccountSearch = (index: number) => {
    const newSearch = [...accountSearch];
    newSearch[index] = "";
    setAccountSearch(newSearch);
  };

  const handleInputChange = (index: number, field: string, value: any) => {
    const newTransaction = [...newJournalDatas.transaction];

    if (field === "creditAmount" || field === "debitAmount") {
      // If the value is empty, set it to "0.00"
      if (value === "") {
        (newTransaction[index] as any)[field] = 0;
      } else {
        // Convert the value to a number and format it to 2 decimal places
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
          (newTransaction[index] as any)[field] = parseFloat(
            numericValue.toFixed(2)
          );
        } else {
          (newTransaction[index] as any)[field] = 0;
        }
      }
    } else {
      (newTransaction[index] as any)[field] = value;
    }

    setNewJournelDatas({
      ...newJournalDatas,
      transaction: newTransaction,
    });
  };


  const { request: getOneJournal } = useApi("get", 5001);
  useEffect(() => {
    const fetchJournal = async () => {
      if (page === "edit") {
        try {
          const url = `${endpoints.GET_ONE_JOURNAL}/${id}`;
          const { response, error } = await getOneJournal(url);
          if (!error && response) {
            setNewJournelDatas((prevData) => ({
              ...prevData,
              ...response.data,
              transaction: response.data.transaction || initialTransactions,
            }));
          }
        } catch (error) {
          console.log("Error in fetching", error);
        }
      }
    };

    fetchJournal();
  }, [page, id]);

  return (
    <div>
      <div className="flex items-center gap-4">
        <Link to={"/accountant/manualJournal"}>
          <BackIcon />
        </Link>
        <p className="text-base font-bold text-heading">Create Manual Journal</p>
      </div>

      <div className="bg-white p-6 rounded-2xl mt-3">
        <div className="grid gap-5 p-4">
          <div className="flex items-center justify-between w-full gap-9">
            <div className="w-[40%]">
              <label className="block text-sm text-text_tertiary mb-2">Date</label>
              <Input
                type="date"
                value={newJournalDatas.date}
                onChange={(e) =>
                  setNewJournelDatas({
                    ...newJournalDatas,
                    date: e.target.value,
                  })
                }
                placeholder="Select date" />
            </div>
            <div className="w-[26%]">
              <label className="block text-sm text-text_tertiary mb-2">Journal#</label>
              <Input
                disabled
                value={newJournalDatas.journel}
                onChange={(e) =>
                  setNewJournelDatas({
                    ...newJournalDatas,
                    journel: e.target.value,
                  })
                }
                placeholder="Enter Journal" />
            </div>
            <div className="w-[40%]">
              <label className="block text-sm text-text_tertiary mb-2">Reference#</label>
              <Input
                value={newJournalDatas.reference}
                onChange={(e) =>
                  setNewJournelDatas({
                    ...newJournalDatas,
                    reference: e.target.value,
                  })
                }
                placeholder="Enter refrence" />
            </div>
          </div>

          <div className="flex items-center justify-between w-full gap-9">
            <div className="w-[50%]">
              <label className="block text-sm text-text_tertiary mb-2">Notes</label>
              <Input
                value={newJournalDatas.note}
                onChange={(e) =>
                  setNewJournelDatas({
                    ...newJournalDatas,
                    note: e.target.value,
                  })
                }
                placeholder="Enter Notes" />
            </div>
            <div className="w-[26%]">
              <label className="block text-sm text-text_tertiary mb-2">
                Journal Type
              </label>
              <div className="flex items-center justify-start mt-3">
                <input
                  type="checkbox"
                  id="checkbox3"
                  className="h-[16px] w-[16px] accent-[#97998E]"
                  checked={newJournalDatas.cashBasedJournal}
                  onChange={(e) =>
                    setNewJournelDatas({
                      ...newJournalDatas,
                      cashBasedJournal: e.target.checked,
                    })
                  }
                />
                <label htmlFor="checkbox3" className="text-sm cursor-pointer font-semibold text-[#2C3E50] ms-3">
                  Cash based journal ?
                </label>
              </div>
            </div>
            <div className="w-[50%] relative">
              <label className="block text-sm text-text_tertiary mb-1">Currency</label>
              <select
                className="mt-1 w-full border border-inputBorder bg-white rounded-full text-sm p-2 pl-4 appearance-none pr-10"
                value={newJournalDatas.currency}
                onChange={(e) =>
                  setNewJournelDatas({
                    ...newJournalDatas,
                    currency: e.target.value,
                  })
                }
              >
                {currencies.map((currency) => (
                  <option key={currency.value} value={currency.value}>
                    {currency.display}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 top-[45%] flex items-center pointer-events-none">
                <CheveronDown strokeWidth="1.2" color="#495160" />
              </div>
            </div>

          </div>
        </div>

        <div className="mt-5 p-4">
          <div className="rounded-md">
            <table className="min-w-full bg-white rounded-md">
              <thead className="text-[12px] text-center text-dropdownText">
                <tr style={{ backgroundColor: "#F9F9F9" }}>
                  {tableHeaders.map((heading, index) => (
                    <th
                      className="py-3 px-8 font-normal text-[#2C3E50]"
                      key={index}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-center text-dropdownText">
                {newJournalDatas.transaction.map((row, index) => (
                  <tr className="border-b border-tableBorder" key={index}>
                    <AccountDropdown
                      index={index}
                      account={row.accountName}
                      accountOptions={accountOptions}
                      isDropdownOpen={isAccountDropdownOpen[index]}
                      search={accountSearch[index]}
                      onAccountSelect={handleAccountSelect}
                      onSearchChange={handleAccountSearchChange}
                      onDropdownToggle={handleAccountDropdownToggle}
                      clearSearch={clearAccountSearch}
                    />
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <textarea
                        className="w-full border border-inputBorder rounded-full text-sm p-2 "
                        placeholder="Description"
                        style={{ height: "2.5rem" }}
                        value={row.description}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Input placeholder="0.00" min={0}
                      type="number"
                        value={row.debitAmount || ""} // Bind the value
                        onChange={(e) => {
                          let value = parseFloat(e.target.value) || 0;

                          // Prevent negative values
                          if (value < 0) {
                            value = 0;
                          }

                          if (!row.creditAmount) {
                            handleInputChange(index, "debitAmount", value);
                          } else {
                            toast.error("Clear credit before entering debit; both can’t be in one row.");
                          }
                        }}
                      />


                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Input min={0} type="number"
                       value={row.creditAmount || ""}
                        placeholder="0.00"
                        onChange={(e) => {
                          let value = parseFloat(e.target.value);

                          // If the entered value is negative, reset it to 0
                          if (value < 0) {
                            value = 0;
                            e.target.value = "0"; // Update the displayed value to 0
                          }

                          if (!row.debitAmount) {
                            handleInputChange(index, "creditAmount", value);
                          } else {
                            toast.error("Clear debit before entering credit; both can’t be in one row.");
                          }
                        }}
                      />
                    </td>
                    <td
                      onClick={() => deleteRow(index)}
                      className={`px-6 py-6 items-center whitespace-nowrap text-sm flex justify-center cursor-pointer ${index < 2 ? "cursor-not-allowed text-gray-400" : ""
                        }`}
                    >
                      <TrashIcon color={index < 2 ? "gray" : "#EA1E4F"} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="pl-5">
          <button onClick={addRow} className="flex  items-center gap-1 ">
            <CirclePlus color="#820000" />{" "}
            <span className="text-sm text-red-700 font-semibold">
              Add New Row
            </span>
          </button>
        </div>

      </div>

      <div
        className="mt-3 p-5 rounded-2xl bg-white w-[60%] ms-auto"
        style={{
          backgroundImage: `url(${journalBgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="grid grid-cols-12">
          <div className="col-span-4 flex flex-col gap-3">
            <p className="text-[14px] text-[#4B5C79]">Sub Total</p>
            <span className="text-base font-bold text-textColor">Total</span>
          </div>
          <div className="col-span-3 flex flex-col gap-3">
            <h4 className="text-[14px] text-[#4B5C79]">
            {organization?.baseCurrency} {totalResult.totalDebit.toFixed(2)}
            </h4>
            <span className="text-textColor font-bold text-base">
            {organization?.baseCurrency}{" "}{totalResult.totalDebit.toFixed(2)}
            </span>
          </div>

          <div className="col-span-3 flex flex-col w-  gap-3 me-20">
            <h4 className="text-[14px] text-[#4B5C79] text-end">
            {organization?.baseCurrency} {totalResult.totalCredit.toFixed(2)}
            </h4>
            <span className="text-textColor font-bold text-base text-end">
            {organization?.baseCurrency} {totalResult.totalCredit.toFixed(2)}
            </span>
          </div>
          <div className="col-span-2 flex flex-col gap-1 bg-[#FEF7F7] py-[4px] px-[14px]">
            <h4 className="text-[12px] text-[#820000]">Difference</h4>
            <h2 className="text-[#820000] font-bold text-[18px]">
              {Math.abs(totalResult.difference).toFixed(2)}
            </h2>
            <h4 className="text-[12px] text-[#820000]">
              {totalResult.difference ? totalResult.differencesLabel : ""}
            </h4>
          </div>
        </div>
      </div>
      <br />
      <div className="flex items-center justify-end gap-3">
        <Button className="text-sm" variant="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddNewJournel} className="text-sm" variant="primary">
          Save
        </Button>
      </div>
    </div>
  )
}

export default NewJournal