import { Link, useParams } from "react-router-dom"
import BackIcon from "../../../assets/icons/BackIcon"
import Button from "../../../Components/Button"
import Pen from "../../../assets/icons/Pen"
import PrinterIcon from "../../../assets/icons/PrinterIcon"
import TrashIcon from "../../../assets/icons/TrashIcon"
import useApi from "../../../Hooks/useApi"
import { useEffect, useState } from "react"
import { endpoints } from "../../../Services/apiEdpoints"

type Props = {}

function ManualJournalView({ }: Props) {
  const { request: getOneJournal } = useApi("get", 5001);
  const { id } = useParams<{ id: string }>();
  const [oneJournal, setOneJournal] = useState<any>(null);

  const getOneJournalData = async () => {
    try {
      const url = `${endpoints.GET_ONE_JOURNAL}/${id}`;
      const { response, error } = await getOneJournal(url);
      if (!error && response) {
        console.log("response", response.data);
        setOneJournal(response.data);
      }
    } catch (error) {
      console.error("Error fetching journal:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getOneJournalData();
    }
  }, [id]);
  return (
    <div>
      <div className="flex items-center gap-4">
        <Link to={"/accountant/manualJournal"}>
          <BackIcon />
        </Link>
        <p className="text-base font-bold text-heading">
          Manual Journal
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl">
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <p className="text-xl text-textColor font-bold pr-4 border-borderRight">
            {oneJournal ? `#${oneJournal?.journalId}` : "#001"}
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <Button variant="secondary" className="pl-6 pr-6" size="sm">
              <Pen color="#0B9C56" />{" "}
              <p className="text-sm font-medium">Edit</p>
            </Button>
            <Button variant="secondary" className="pl-5 pr-5" size="sm">
              <PrinterIcon color="#0B9C56" />{" "}
              <p className="text-sm font-medium">Print</p>
            </Button>
            <Button variant="secondary" className="pl-5 pr-5" size="sm">
              <TrashIcon color="#0B9C56" />{" "}
              <p className="text-sm font-medium">Delete</p>
            </Button>
          </div>
        </div>
        <hr className="border-t border-inputBorder mt-4" />

        {/* pdf view */}
        <div className="flex items-center justify-center text-sm text-textColor p-5">
          <div
            className="p-5"
            style={{ width: "595px", boxShadow: "-1px 1px 15px -8px black" }}
          >
            <div className="bg-[#FDF8F0] p-5 rounded-lg">
              <div className="flex mb-7">
                <p className="font-bold text-[#495160] text-2xl">JOURNAL</p>
                {/* journalId */}
                <p className="ml-auto text-[#303F58] font-bold">
                  {oneJournal ? `#${oneJournal?.journalId}` : "#0001"}
                </p>
              </div>

              <div className="space-y-2 text-[#4B5C79] mb-5">
                <p className="mt-5">
                  {/* date */}
                  Billed Date:
                  <b className="ms-4 text-[#303F58]">
                    {oneJournal ? oneJournal?.date : "*/*/*"}
                  </b>
                </p>

                {/* totalCreditAmount */}
                <p>
                  Amount:
                  <b className="ms-4 text-[#303F58]">
                    {oneJournal
                      ? oneJournal?.totalCreditAmount.toFixed(2)
                      : "0.00"}
                  </b>
                </p>

                {/* reference */}
                <p>
                  Reference Number:
                  <b className="ms-4 text-[#303F58]">
                    {oneJournal ? oneJournal?.reference : "#00"}
                  </b>
                </p>
              </div>
            </div>

            {/* Transaction Table */}
            <table className="w-full table-auto text-[#4B5C79] border-collapse my-7">
              <thead>
                <tr>
                  <th className="text-left p-2 text-[#303F58]">Account</th>
                  <th className="text-right p-2 font-normal">Debits</th>
                  <th className="text-right p-2 font-normal">Credits</th>
                </tr>
              </thead>
              <tbody>
                {oneJournal?.transaction?.map((txn: any) => (
                  <tr className="border-b border-slate-400 mb-5" key={txn.accountId}>
                    <td className="px-2 py-5 text-left">{txn.accountName}</td>
                    <td className="text-right px-2 py-5">
                      {txn.debitAmount.toFixed(2)}
                    </td>
                    <td className="text-right px-2 py-5">
                      {txn.creditAmount.toFixed(2)}
                    </td>
                  </tr>
                ))}

                <tr>
                  <td className="px-2 py-5 text-left"></td>
                  <td className="px-2 py-5 text-right">SubTotal</td>
                  <td className="px-2 py-5 text-right">
                    {oneJournal
                      ? oneJournal?.totalDebitAmount.toFixed(2)
                      : "0.00"}
                  </td>
                  <td className="text-right px-2 py-5">
                    {oneJournal
                      ? oneJournal?.totalCreditAmount.toFixed(2)
                      : "0.00"}
                  </td>
                </tr>
              </tbody>
            </table>


            <div className="bg-[#F7ECD9] ms-auto flex gap-5 rounded-lg p-3 text-end w-[55%] text-xs">
              <b>Total</b>
              <br />
              <b>
                RS.
                {oneJournal
                    ? oneJournal?.totalDebitAmount.toFixed(2)
                    : "0.00"}
              </b>{" "}
              <br />
              <b>
                Rs.
                {oneJournal
                    ? oneJournal?.totalCreditAmount.toFixed(2)
                    : "0.00"}
              </b>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManualJournalView