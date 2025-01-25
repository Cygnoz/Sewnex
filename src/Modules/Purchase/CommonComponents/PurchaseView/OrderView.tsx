import { useEffect, useState } from "react";
import PrinterIcon from "../../../../assets/icons/PrinterIcon";
import Button from "../../../../Components/Button";
import useApi from "../../../../Hooks/useApi";
import { endpoints } from "../../../../Services/apiEdpoints";
import CheveronDown from "../../../../assets/icons/CheveronDown";
import PaymentMadeHistory from "../../Bill/PaymentMadeHistory";
import Journal from "../../Bill/Journal";

type Props = {
  data?: any;
  page?: string;
  organization?: any;
};

function OrderView({ data, page, organization }: Props) {
  const [supplier, setSupplier] = useState<any>({});
  const { request: getSupplier } = useApi("get", 5009);

  const getSupplierAddress = async () => {
    if (!data?.supplierId) return;

    try {
      const url = `${endpoints.GET_ONE_SUPPLIER}/${data.supplierId}`;
      const { response, error } = await getSupplier(url);
      if (response && !error) {
        setSupplier(response.data);
      } else {
        console.error("Error fetching supplier:", error);
      }
    } catch (error) {
      console.error("Error fetching supplier:", error);
    }
  };

  useEffect(() => {
    getSupplierAddress();
  }, [data]);

  const renderItemTable = () => {
    const dummyItems = [
      {
        itemId: "dummy1",
        itemName: "Sample Item 1",
        itemImage: "https://i.postimg.cc/bYSD4C0j/download.jpg",
        itemQuantity: 10,
        itemCostPrice: 50,
        itemDiscount: 5,
        discountType: "percentage",
        itemAmount: 475,
      },
      {
        itemId: "dummy2",
        itemName: "Sample Item 2",
        itemImage: "https://via.placeholder.com/100",
        itemQuantity: 5,
        itemCostPrice: 100,
        itemDiscount: 10,
        discountType: "flat",
        itemAmount: 450,
      },
    ];

    const items = data?.itemTable || data?.items || dummyItems;

    if (!items || items.length === 0) {
      return <p>No items available</p>;
    }

    const currency = organization?.baseCurrency || "";

    return (
      <div className="mb-4 ">
        {items.map(
          (item: {
            itemId: string;
            itemName: string;
            itemImage?: string;
            itemQuantity?: number;
            itemCostPrice?: number;
            itemDiscount?: number;
            discountType?: string;
            itemAmount?: number;
          }) => (
            <div key={item.itemId}>
              {" "}
              <div className="mt-6 py-2 px-[10px] flex flex-col bg-[#F3F3F5] rounded-lg">
                <div className="w-full flex items-center gap-8 cursor-pointer">
                  {/* Item Section */}
                  <div className="flex items-start justify-start gap-4">
                    <img
                      src={item.itemImage || ""}
                      alt="Item"
                      className="h-9 w-9 rounded-full"
                    />
                    <div className="text-textColor border-[#A3A9B3] border-r-[1px]  pe-16 space-y-1 ">
                      <p className="text-xs text-text_tertiary">Item</p>
                      <p className="font-semibold text-xs text-text_tertiary">
                        {item.itemName}
                      </p>
                    </div>
                  </div>

                  {/* Ordered Section */}
                  <div className="text-start  border-[#A3A9B3] border-r-[1px] space-y-1 pe-16">
                    <p className="text-xs text-text_tertiary">Ordered</p>
                    <p className="font-semibold text-xs text-text_tertiary">
                      {item.itemQuantity || 0} PCS
                    </p>
                  </div>

                  {/* Status Section */}
                  <div className="text-start  border-[#A3A9B3] border-r-[1px] space-y-1 pe-16">
                    <p className="text-xs text-text_tertiary">Status</p>
                    <p className="font-semibold text-xs text-text_tertiary">
                      0 Invoiced
                    </p>
                  </div>

                  {/* Rate Section */}
                  <div className="text-start  border-[#A3A9B3] border-r-[1px] space-y-1 pe-16">
                    <p className="text-xs text-text_tertiary">Rate</p>
                    <p className="font-semibold text-xs text-text_tertiary">
                      {currency} {item.itemCostPrice || 0}
                    </p>
                  </div>

                  {/* Discount Section */}
                  <div className="text-start  border-[#A3A9B3] border-r-[1px] space-y-1 pe-16">
                    <p className="text-xs text-text_tertiary">Discount</p>
                    <p className="font-semibold text-xs text-text_tertiary">
                      {item.discountType === "percentage"
                        ? ((item.itemCostPrice || 0) *
                            (item.itemDiscount || 0)) /
                          100
                        : item.itemDiscount || 0}
                    </p>
                  </div>

                  {/* Amount Section */}
                  <div className="text-start space-y-1 ">
                    <p className="text-xs text-text_tertiary">Amount</p>
                    <p className="font-semibold text-sm text-text_tertiary">
                      {currency} {item.itemAmount || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-start mb-4">
        <p className="text-text_tertiary border-r-[1px] border-borderRight pr-4 text-sm font-normal">
          Order Date:{" "}
          <span className="ms-2 text-dropdownText text-sm font-semibold">
            {data?.orderDate}
          </span>
        </p>
        <p className="text-text_tertiary border-r-[1px] border-borderRight px-4 text-sm font-normal">
          Bill Date:{" "}
          <span className="ms-3 text-dropdownText text-sm font-semibold">
            {data?.billDate}
          </span>
        </p>
        <p className="text-text_tertiary border-r-[1px] border-borderRight px-4 text-sm font-normal">
          Due Date:{" "}
          <span className="ms-3 text-dropdownText text-sm font-semibold">
            {data?.dueDate}
          </span>
        </p>

        <p className="text-text_tertiary border-r-[1px] border-borderRight px-4 text-sm font-normal">
          Expected Shipment:{" "}
          <span className="ms-3 text-dropdownText text-sm font-semibold">
            {data?.expectedShipmentDate}
          </span>
        </p>

        {page == "Bills" && (
          <p className="text-text_tertiary pl-4 text-sm font-normal">
            Payment Terms:{" "}
            <span className="ms-3 text-dropdownText text-sm font-semibold">
              {data?.paymentTerms}
            </span>
          </p>
        )}
        {page === "DebitNote" && (
          <p className="text-text_tertiary pl-4 text-sm font-normal">
            Supplier Debit Date:{" "}
            <span className="ms-3 text-dropdownText text-sm font-semibold">
              {data?.supplierDebitDate}
            </span>
          </p>
        )}
      </div>

      {renderItemTable()}
      <PaymentMadeHistory />
      {page === "Bills" && <Journal />}
      <hr className="mt-6 border-t border-inputBorder" />
      <div className="flex justify-between gap-6 mt-4 ">
        <div className="p-6 rounded-lg border border-billingBorder w-[50%] h-fit">
          <p className="text-base font-bold text-text_tertiary">
            Billing Address
          </p>
          <div className="text-sm text-text_tertiary mt-2 space-y-1">
            {supplier ? (
              <>
                {supplier?.supplierDisplayName && (
                  <p>{supplier.supplierDisplayName}</p>
                )}
                {supplier?.companyName && <p>{supplier.companyName}</p>}
                {(supplier?.billingAddressStreet1 ||
                  supplier?.billingAddressStreet2) && (
                  <p>
                    {supplier.billingAddressStreet1 || ""}{" "}
                    {supplier.billingAddressStreet2 && ", "}
                    {supplier.billingAddressStreet2 || ""}
                  </p>
                )}
                {supplier?.billingCity && <p>{supplier.billingCity}</p>}
                {(supplier?.billingCountry || supplier?.billingPinCode) && (
                  <p>
                    {supplier.billingCountry || ""}{" "}
                    {supplier.billingPinCode
                      ? `- ${supplier.billingPinCode}`
                      : ""}
                  </p>
                )}
                {supplier?.billingPhone && <p>{supplier.billingPhone}</p>}
              </>
            ) : (
              <p>Supplier data not available.</p>
            )}
          </div>
        </div>

        <div className="p-6 rounded-lg border border-billingBorder w-[50%]">
          {page !== "PurchaseOrder" && page !== "DebitNote" ? (
            <>
              <p className="text-base font-bold text-text_tertiary">
                Order Summary
              </p>
              <div className="mt-4 text-sm text-text_tertiary">
                <div className="flex justify-between ">
                  <p>Untaxed Amount</p>
                  <p>
                    {organization?.baseCurrency}{" "}
                    {(data?.grandTotal || 0) - (data?.totalTaxAmount || 0)}
                  </p>
                </div>
                {data?.cgst > 0 && data?.sgst > 0 ? (
                  <>
                    <div className="flex justify-between mt-4">
                      <p>SGST</p>
                      <p>
                        {organization?.baseCurrency} {data?.sgst || 0.0}
                      </p>
                    </div>
                    <div className="flex justify-between mt-4">
                      <p>CGST</p>
                      <p>
                        {organization?.baseCurrency} {data?.cgst || 0.0}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between mt-4">
                    <p>IGST</p>
                    <p>
                      {organization?.baseCurrency} {data?.igst || 0.0}
                    </p>
                  </div>
                )}
                <div className="flex justify-between mt-4">
                  <p className="text-text_fourthiry font-bold">Total</p>
                  <p>
                    {organization?.baseCurrency} {data?.grandTotal || 0.0}
                  </p>
                </div>
                <hr className="mt-4 border-t border-[#CCCCCC]" />
                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="secondary" size="sm" className="px-4">
                    Cancel
                  </Button>
                  <Button variant="secondary" size="sm" >
                    <PrinterIcon color="#0b9d56"   />
                    Print
                  </Button>
                  <Button variant="primary" size="sm" >
                    Save & Send
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="text-base font-bold text-textColor">
                Order Summary
              </p>
              <div className="mt-4 text-sm space-y-2 text-textColor">
                {page === "PurchaseOrder" && (
                  <>
                    <div className="flex justify-between">
                      <p>Other Expense</p>
                      <p>
                        {organization?.baseCurrency} {data?.otherExpense || 0}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p>Freight</p>
                      <p>
                        {organization?.baseCurrency} {data?.freight || 0}
                      </p>
                    </div>
                  </>
                )}
                <div className="flex justify-between">
                  <p>Sub Total</p>
                  <p>
                    {organization?.baseCurrency} {data?.subTotal || 0}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Total Item</p>
                  <p>{data?.totalItem || 0}</p>
                </div>
                {page === "PurchaseOrder" && (
                  <div className="flex justify-between">
                    <p>Discount</p>

                    <div className="flex items-center gap-2">
                      <div className=" ">
                        <div className="border border-inputBorder rounded-lg flex items-center justify-center p-1 gap-1">
                          <input
                            value={data?.transactionDiscount}
                            name="transactionDiscount"
                            type="text"
                            placeholder="0"
                            className="w-[30px]  focus:outline-none text-center"
                          />
                          <select
                            disabled
                            className="text-xs   text-zinc-400 bg-white relative"
                            value={data.transactionDiscountType}
                            name="transactionDiscountType"
                          >
                            <option value="percentage">%</option>
                            <option value="currency">
                              {organization.baseCurrency}
                            </option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  text-gray-700 ms-1">
                            <CheveronDown color="gray" />
                          </div>
                        </div>
                      </div>
                      <p>
                        {organization?.baseCurrency}{" "}
                        {data?.transactionDiscountAmount || 0.0}
                      </p>
                    </div>
                  </div>
                )}
                {data?.cgst > 0 && data?.sgst > 0 ? (
                  <>
                    <div className="flex justify-between ">
                      <p>SGST</p>
                      <p>
                        {organization?.baseCurrency} {data?.sgst | 0.0}
                      </p>
                    </div>
                    <div className="flex justify-between ">
                      <p>CGST</p>
                      <p>
                        {organization?.baseCurrency} {data?.cgst | 0.0}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between ">
                    <p>IGST</p>
                    <p>
                      {organization?.baseCurrency} {data?.igst | 0.0}
                    </p>
                  </div>
                )}
                <div className="flex justify-between ">
                  <p>Total Tax Amount</p>
                  <p>
                    {organization?.baseCurrency} {data?.totalTaxAmount | 0.0}
                  </p>
                </div>
                {page === "PurchaseOrder" && (
                  <>
                    <div className="flex justify-between ">
                      <p>Total</p>
                      <p>
                        {organization?.baseCurrency}{" "}
                        {(data?.grandTotal - data?.roundOff) | 0.0}
                      </p>
                    </div>
                    <div className="flex justify-between mt-4">
                      <p>Round Off</p>
                      <p>
                        {organization?.baseCurrency} {data?.roundOff | 0.0}
                      </p>
                    </div>
                    <div className="flex justify-between mt-4">
                      <p>Round Off</p>
                      <p>
                        {organization?.baseCurrency} {data?.roundOff | 0.0}
                      </p>
                    </div>
                  </>
                )}

                <hr className="mt-4 border-t border-[#CCCCCC]" />
                <div className="flex justify-between mt-4 font-bold">
                  <p>Total</p>
                  <p>
                    {organization?.baseCurrency} {data?.grandTotal | 0.0}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderView;
