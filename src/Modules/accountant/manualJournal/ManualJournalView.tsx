import { Link } from "react-router-dom"
import BackIcon from "../../../assets/icons/BackIcon"
import Button from "../../../Components/Button"
import Pen from "../../../assets/icons/Pen"
import PrinterIcon from "../../../assets/icons/PrinterIcon"
import TrashIcon from "../../../assets/icons/TrashIcon"

type Props = {}

function ManualJournalView({}: Props) {
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
                #001
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <Button variant="secondary" className="pl-6 pr-6" size="sm">
                <Pen color="#0B9C56" />{" "}
                <p className="text-sm font-medium">Edit</p>
              </Button>
              <Button variant="secondary" className="pl-5 pr-5" size="sm">
                <PrinterIcon color="#0B9C56"/>{" "}
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
                    #001
                  </p>
                </div>

                <div className="space-y-2 text-[#4B5C79] mb-5">
                  <p className="mt-5">
                    {/* date */}
                    Billed Date:
                    <b className="ms-4 text-[#303F58]">
                     12/12/2025
                    </b>
                  </p>

                  {/* totalCreditAmount */}
                  <p>
                    Amount:
                    <b className="ms-4 text-[#303F58]">
                      0.00
                    </b>
                  </p>

                  {/* reference */}
                  <p>
                    Reference Number:
                    <b className="ms-4 text-[#303F58]">
                      #00
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
                    <tr className="border-b border-slate-400 mb-5" >
                      <td className="px-2 py-5 text-left">Alwin</td>
                      <td className="text-right px-2 py-5">
                        0.00
                      </td>
                      <td className="text-right px-2 py-5">
                        0.00
                      </td>
                    </tr>

                  <tr>
                    <td className="px-2 py-5 text-left"></td>
                    <td className="px-2 py-5 text-right">SubTotal</td>
                    <td className="px-2 py-5 text-right">
                      0.00
                    </td>
                    <td className="text-right px-2 py-5">
                     0.00
                    </td>
                  </tr>
                </tbody>
              </table>


              <div className="bg-[#F7ECD9] ms-auto flex gap-5 rounded-lg p-3 text-end w-[55%] text-xs">
                <b>Total</b>
                <br />
                <b>
                  RS.
                0.00
                </b>{" "}
                <br />
                <b>
                  Rs.
                  0.00
                </b>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ManualJournalView