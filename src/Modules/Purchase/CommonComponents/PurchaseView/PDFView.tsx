import { useEffect, useState } from "react";
import useApi from "../../../../Hooks/useApi";
import { endpoints } from "../../../../Services/apiEdpoints";

type Props = { data?: any; page?: string; organization?: any };

const PDFView = ({ data, page, organization }: Props) => {
  const [supplier, setSupplier] = useState<[] | any>([]);
  const { request: getSupplier } = useApi("get", 5009);

  const getSupplierAddress = async () => {
    try {
      const url = `${endpoints.GET_ONE_SUPPLIER}/${data.supplierId}`;
      const { response, error } = await getSupplier(url);
      if (!error && response) {
        setSupplier(response.data);
      } else {
        console.log("Error in fetching Supplier ,", error);
      }
    } catch (error) {
      console.log("Error in fetching Supplier ,", error);
    }
  };
  useEffect(() => {
    getSupplierAddress();
  }, [data]);
  console.log(supplier);
  return (
    <div className="mt-4">
      <div className="flex items-center justify-center mb-4">
        <p className="text-text_tertiary border-r-[1px] border-borderRight pr-4 text-xs font-normal">
          Order Date:{" "}
          <span className="ms-2 text-dropdownText text-xs font-semibold">
            {data?.orderDate}
          </span>
        </p>
        <p className="text-text_tertiary border-r-[1px] border-borderRight px-4 text-xs font-normal">
          Bill Date:{" "}
          <span className="ms-3 text-dropdownText text-xs font-semibold">
            {data?.billDate}
          </span>
        </p>
        <p className="text-text_tertiary border-r-[1px] border-borderRight px-4 text-xs font-normal">
          Due Date:{" "}
          <span className="ms-3 text-dropdownText text-xs font-semibold">
            {data?.dueDate}
          </span>
        </p>

        <p className="text-text_tertiary border-r-[1px] border-borderRight px-4 text-xs font-normal">
          Expected Shipment:{" "}
          <span className="ms-3 text-dropdownText text-xs font-semibold">
            {data?.expectedShipmentDate}
          </span>
        </p>

        {page == "Bills" && (
          <p className="text-text_tertiary pl-4 text-xs font-normal">
            Payment Terms:{" "}
            <span className="ms-3 text-dropdownText text-xs font-semibold">
              {data?.paymentTerms}
            </span>
          </p>
        )}
        {page === "DebitNote" && (
          <p className="text-text_tertiary pl-4 text-xs font-normal">
            Supplier Debit Date:{" "}
            <span className="ms-3 text-dropdownText text-xs font-semibold">
              {data?.supplierDebitDate}
            </span>
          </p>
        )}
      </div>
      <div className="flex justify-center items-center">
        <div className="bg-white drop-shadow-2xl w-[595px]  p-8 pl-[24px] pr-[24px]">
          <div className="flex justify-between items-center mb-8 mt-8">
            <div>
              <img
                src={organization.organizationLogo}
                alt="Company Logo"
                className="h-[49px] w-[71px]"
              />
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold text-textColor">
                {page == "PurchaseOrder"
                  ? "PURCHASE ORDER"
                  : page === "Bills"
                  ? "BILL"
                  : "DEBIT NOTE"}
              </h2>
              <p className="text-xs font-bold text-dropdownText mt-[5px]">
                {page === "PurchaseOrder"
                  ? `Purchase Order# ${data.purchaseOrder}`
                  : page == "Bills"
                  ? `Bill# ${data.billNumber}`
                  : `Debit Note# ${data.debitNote}`}
              </p>
              <h3 className="font-normal text-xs mt-[14px] text-pdftext">
                {supplier?.supplierDisplayName}
              </h3>
              {(supplier?.supplierEmail || supplier?.mobile) && (
                <p className="font-normal text-xs text-pdftext">
                  {supplier.supplierEmail && supplier.supplierEmail}
                  {supplier.supplierEmail && supplier.mobile && " | "}
                  {supplier.mobile && `+${supplier.mobile}`}
                </p>
              )}
            </div>
          </div>

          <div className="mb-8 mt-8 gap-4 flex items-center justify-between">
            <div>
              <h3 className="font-normal text-xs text-pdftext">Bill From,</h3>
              <p className="text-pdftext text-xs font-bold mt-2">
                {supplier?.supplierDisplayName}
              </p>
              {(supplier?.supplierEmail || supplier?.mobile) && (
                <p className="font-normal text-xs text-pdftext mt-2">
                  {supplier.supplierEmail && supplier.supplierEmail}
                  {supplier.supplierEmail && supplier.mobile && " | "}
                  {supplier.mobile && supplier.mobile}
                </p>
              )}

              <p className="font-normal text-xs text-pdftext mt-2">
                {supplier?.billingAddressStreet1}
                {supplier?.billingAddressStreet1 && <p>|</p>}
                {supplier?.billingAddressStreet2}
                {supplier?.billingAddressStreet2 && <p>, </p>}
                <br />
                {supplier.billingState} {supplier.billingCountry}{" "}
                {supplier.billingPinCode}
              </p>
            </div>
            {page == "PurchaseOrder" ? (
              <div className="mt-2">
                <h3 className="font-normal text-xs text-pdftext">Bill to</h3>
                <p className="text-pdftext text-xs font-bold mt-2">
                  {supplier?.supplierDisplayName}
                </p>
                <p className="font-normal text-xs text-pdftext mt-2">
                  Order Date: {data.purchaseOrderDate}
                </p>
                <p className="font-normal text-xs text-pdftext mt-2">
                  Expected shipment Date: {data.purchaseOrderDate}
                </p>
              </div>
            ) : (
              <div className="mt-2 text-xs">
                {page !== "DebitNote" && (
                  <>
                    <p className="text-pdftext mt-2 flex">
                      <b>Bill Date</b>{" "}
                      <span className="text-end ml-auto">{data.billDate}</span>
                    </p>
                    <p className="text-pdftext mt-2 flex">
                      <b>Due Date</b>{" "}
                      <span className="text-end ml-auto">{data.dueDate}</span>
                    </p>
                    <p className="text-pdftext mt-2 flex">
                      <b className="me-5">Terms</b>
                      <span className="text-end ml-auto">
                        {" "}
                        {data.paymentTerms}
                      </span>
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          <table className="w-full mb-7 border border-dropdownBorder">
            <thead className="border-b border-dropdownBorder ">
              <tr className="font-bold text-[10px] text-pdftext text-center">
                <th className="py-2 px-4 text-left w-[350px]">Description</th>
                <th className="py-2 px-4 pl-16 ">Qty</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">GST</th>
                <th className="py-2 px-4">Amount</th>
              </tr>
            </thead>
            {data?.itemTable?.length > 0 || data?.items?.length > 0 ? (
              (data?.itemTable || data?.items).map((item: any) => (
                <tbody className="h-[56px]" key={item.id}>
                  <tr className="text-[10px] text-left">
                    <td className="py-2 px-4">{item.itemName}</td>
                    <td className="py-2 px-4 pl-16">{item.itemQuantity}</td>
                    <td className="py-2 px-4">{item.itemCostPrice}</td>
                    <td className="py-2 px-4">
                      {item.itemCgstAmount > 0 && item.itemSgstAmount > 0
                        ? item.itemCgstAmount + item.itemSgstAmount
                        : item.itemIgstAmount}
                    </td>
                    <td className="py-2 px-4">{item.itemAmount}</td>
                  </tr>
                </tbody>
              ))
            ) : (
              <tbody>
                <tr>
                  <td
                    colSpan={5}
                    className="py-2 text-center text-xs text-gray-500"
                  >
                    No items available
                  </td>
                </tr>
              </tbody>
            )}
          </table>

          <div className="flex justify-end ">
            <div className="w-[58.4%] border bg-gray-100 border-dropdownBorder rounded bg-pdfbg">
              <div className="px-4 mt-4   rounded-lg flex justify-between">
                <h4 className="text-pdftext text-xs font-normal">
                  Sub total (excl. GST)
                </h4>
                <p className="text-pdftext text-xs font-normal">
                  {data.subTotal - data.totalTaxAmount || 0.0}
                </p>
              </div>
              <div className="px-4 mt-3 mb-5 bg-gray-100 rounded-lg flex justify-between">
                <h4 className="text-pdftext text-xs font-normal">Total</h4>
                <p className="text-pdftext text-xs font-normal">
                  {data.grandTotal}
                </p>
              </div>
            </div>
          </div>

          <div className="w-[58.4%] border mt-4 ml-auto bg-gray-100 border-dropdownBorder rounded bg-pdfbg">
            <div className="px-4 my-4   rounded-lg flex justify-between">
              <h4 className="text-pdftext text-xs font-normal">
                Credit Remaining
              </h4>
              <p className="text-pdftext text-xs font-normal">
                {data?.balanceAmount || 0.0}
              </p>
            </div>
          </div>

          <div className="w-[50%] mt-[64px] gap-4 mb-[55.5px] flex justify-center items-center">
            <p className="text-pdftext text-xs font-normal">Signature</p>
            <div className="border-t  border-[0.5px] border-loremcolor w-full "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFView;
