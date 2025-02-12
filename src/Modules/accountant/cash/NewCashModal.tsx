import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import Button from "../../../Components/Button"
import Input from "../../../Components/Form/Input"
import Modal from "../../../Components/modal/Modal"
import accountsBgImage from "../../../assets/images/cashBgimage.png"
import CirclePlus from "../../../assets/icons/circleplus"
import CheveronDown from "../../../assets/icons/CheveronDown"
import useApi from "../../../Hooks/useApi"
import { endpoints } from "../../../Services/apiEdpoints"
import toast from "react-hot-toast"
import EditIcon from "../../../assets/icons/EditIcon"

type Props = { page?: string, accountData: any; fetchAllAccounts: () => void };

const NewCashModal = ({ page, accountData, fetchAllAccounts }: Props) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const initialAccounts = {
        _id: "",
        accountName: "",
        accountCode: "",
        accountSubhead: "Cash",
        accountHead: "Asset",
        accountGroup: "Asset",
        openingBalance: "",
        openingBalanceDate: "",
        description: "",
        debitOpeningBalance: "",
        creditOpeningBalance: "",
    };

    const [accounts, setFormValues] = useState(initialAccounts);
    const [openingType, setOpeningType] = useState("Debit");
    const { request: CreateAccount } = useApi("post", 5001);
    const { request: editAccount } = useApi("put", 5001);

    const openModal = () => {
        if (page === "Edit" && accountData) {
            setFormValues(accountData);
            setOpeningType(accountData.debitOpeningBalance ? "Debit" : "Credit");
        }
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setFormValues(initialAccounts);
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        let processedValue = value;

        // If the value is negative and the field is openingBalance, reset it to 0
        if (name === "openingBalance" && parseFloat(value) < 0) {
            processedValue = "0";
        }

        // Update openingType and related balances accordingly
        if (name === "openingType") {
            setOpeningType(processedValue);
            setFormValues((prevFormValues) => ({
                ...prevFormValues,
                debitOpeningBalance: processedValue === "Debit" ? prevFormValues.openingBalance : "",
                creditOpeningBalance: processedValue === "Credit" ? prevFormValues.openingBalance : "",
            }));
        } else if (name === "openingBalance") {
            setFormValues((prevFormValues) => ({
                ...prevFormValues,
                debitOpeningBalance: openingType === "Debit" ? processedValue : prevFormValues.debitOpeningBalance,
                creditOpeningBalance: openingType === "Credit" ? processedValue : prevFormValues.creditOpeningBalance,
            }));
        } else {
            // Update any other fields normally
            setFormValues((prevBankAccount) => ({
                ...prevBankAccount,
                [name]: processedValue,
            }));
        }
    };

    useEffect(() => {
        if (page === "Edit" && accountData) {
            setFormValues(accountData);
            setOpeningType(accountData.debitOpeningBalance ? "Debit" : "Credit");
        }
    }, [page, accountData, isModalOpen]);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const url =
                page === "Edit"
                    ?
                    `${endpoints.EDIT_NEW_ACCOUNT}/${accounts._id}`
                    : endpoints.Add_NEW_ACCOUNT;
            const API = page === "Edit" ? editAccount : CreateAccount;
            const body = accounts;
            const { response, error } = await API(url, body);

            if (!error && response) {
                toast.success(response.data.message);
                closeModal();
                fetchAllAccounts();
                setFormValues(initialAccounts);
            } else {
                toast.error(error.response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const formRef = useRef<HTMLFormElement>(null);

    const handleExternalSubmit = () => {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
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
                        <p className="mb-2">Name</p>
                        <Input
                            name="accountName"
                            value={accounts.accountName}
                            onChange={handleChange}
                            placeholder="Enter Your name" />

                        <div className="mt-4 ">
                            <p className="mb-2">Account Code</p>
                            <Input
                                name="accountCode"
                                value={accounts.accountCode}
                                onChange={handleChange}
                                placeholder="Enter code"
                            />
                        </div>
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
                                            ? accounts.debitOpeningBalance
                                            : accounts.creditOpeningBalance
                                    }
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="mb-2">Description</p>
                            <Input
                                name="description"
                                value={accounts.description}
                                onChange={handleChange}
                                placeholder="Enter Description" size="lg" />
                        </div>
                    </form>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <Button onClick={closeModal} variant="secondary" className="text-sm font-semibold">
                        Cancel
                    </Button>
                    <Button onClick={handleExternalSubmit}>save</Button>
                </div>


            </Modal>
        </div>
    )
}

export default NewCashModal