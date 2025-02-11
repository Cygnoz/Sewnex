import { useNavigate, useParams } from "react-router-dom";
import BackIcon from "../../assets/icons/BackIcon";
import { useEffect, useState } from "react";
import { endpoints } from "../../Services/apiEdpoints";
import useApi from "../../Hooks/useApi";

type Props = {};

type TrialBalance = {
  _id: string;
  organizationId: string;
  date: string;
  accountId: string;
  accountName: string;
  action: string;
  creditAmount: number;
  debitAmount: number;
  remark: string;
  cumulativeSum: any;
  createdDate: string;
  createdTime: string
};

function AccountantViewOne({ }: Props) {
  const { id } = useParams<{ id: string }>();

  const { request: getOneTrialBalance } = useApi("get", 5001);
  const { request: getOneOrganization } = useApi("get", 5004);
  const [trialBalance, setTrialBalance] = useState<TrialBalance[]>([]);
  const [oneOrganization, setOneOrganization] = useState<any | []>([]);

  const getOneTrialBalanceData = async () => {
    try {
      const url = `${endpoints.GET_ONE_TRIAL_BALANCE}/${id}`;
      const { response, error } = await getOneTrialBalance(url);
      if (!error && response) {
        setTrialBalance(response.data);
      }
    } catch (error) {
      console.error("Error fetching trial balance:", error);
    }
  };

  const getOrganization = async () => {
    try {
      const url = `${endpoints.GET_ONE_ORGANIZATION}`;
      const { response, error } = await getOneOrganization(url);

      if (!error && response?.data) {
        setOneOrganization(response.data);
      }
    } catch (error) {
      console.error("Error fetching organization:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getOneTrialBalanceData();
      getOrganization();
    }
  }, [id]);

  const calculateTotal = () => {
    const totalCredit = trialBalance.reduce(
      (sum, item) => sum + (Number(item.creditAmount) || 0),
      0
    );
    const totalDebit = trialBalance.reduce(
      (sum, item) => sum + (Number(item.debitAmount) || 0),
      0
    );
    return totalDebit - totalCredit;
  };

  const formattedTotal = () => {
    const total = calculateTotal();
    const absoluteValue = Math.abs(total).toFixed(2); 
    return total < 0 ? `${absoluteValue} (Cr)` : `${absoluteValue} (Dr)`;
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center gap-4">
        <div onClick={() => navigate(-1)}>
          <BackIcon />
        </div>
        <p className="text-base font-bold text-[#37393A]">
          {trialBalance.length > 0 && trialBalance[0].accountName}
        </p>
      </div>

      <div className="bg-white mt-3 rounded-2xl px-6 py-[21px]">
        <p className="text-[#303F58] font-bold text-base">Recent Transaction</p><br />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white  rounded-lg">
            <thead className="text-[12px] text-center text-[#4F5152]">
              <tr className="bg-[#F9F9F9]">
                <th className="py-3 px-4 font-medium  text-sm">Date</th>
                <th className="py-3 px-4 font-medium  text-sm">Type</th>
                <th className="py-3 px-4 font-medium  text-sm">
                  Debit {oneOrganization.baseCurrency && `(${oneOrganization.baseCurrency})`}
                </th>
                <th className="py-3 px-4 font-medium  text-sm">
                  Credit {oneOrganization.baseCurrency && `(${oneOrganization.baseCurrency})`}
                </th>
                <th className="py-3 px-4 font-medium  text-sm">Amount</th>
                <th className="py-3 px-4 font-medium  text-sm">Note</th>

              </tr>
            </thead>
            <tbody className="text-[#667085] text-center text-sm">
              {/* Check if trialBalance array has data */}
              {trialBalance.length > 0 ? (
                trialBalance.map((item) => (
                  <tr key={item._id}>
                    <td className="py-3.5 px-4 border-b border-[#EAECF0]">
                      {item?.createdDate ? (
                        `${item.createdDate}
                        `
                      ) : '-'}
                    </td>

                    <td className="py-3.5 px-4 border-b border-[#EAECF0]">
                      {item?.action || '-'}
                    </td>
                    <td className="py-3.5 px-4 border-b border-[#EAECF0]">
                      {item?.debitAmount ? item.debitAmount : '0.00'}
                    </td>
                    <td className="py-3.5 px-4 border-b border-[#EAECF0]">
                      {item?.creditAmount ? item.creditAmount : '0.00'}
                    </td>
                    <td className="py-3.5 px-4 border-b border-[#EAECF0]">
                      {item?.cumulativeSum ? item.cumulativeSum : '0.00'}
                    </td>
                    <td className="py-3.5 px-4 border-b border-[#EAECF0]">
                      {item?.remark ? item.remark : '-'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-5 px-4 border-b border-tableBorder text-center text-red-600">
                    Not found !
                  </td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      </div>
      <div className="mt-4 ms-auto text-end p-4 rounded-2xl bg-gradient-to-r from-[#F7ECD9] to-[#B5F0D3] w-[30%]">
        <div className="flex justify-between items-center">
          <p className="text-[#0B1320]">Total:</p> 
          <p className="text-[#202224] font-bold text-xl">{formattedTotal()}</p>
        </div>
      </div>

    </div>
  );
}

export default AccountantViewOne;
