import { useState } from "react";
import CirclePlus from "../../../assets/icons/CirclePlus";
import Button from "../../../Components/Button";
import Modal from "../../../Components/modal/Modal";
import Img from "../../../assets/icons/Img";
import Input from "../../../Components/Form/Input";
import Select from "../../../Components/Form/Select";
import Checkbox from "../../../Components/Form/Checkbox";
import { useOrganization } from "../../../Context/OrganizationContext";

interface ItemData {
  _id: string;
  itemType: string;
  itemName: string;
  itemImage: string;
  sku: string;
  unitName: string;
  returnableItem: boolean;
  hsnCode: string;
  sac: string;
  taxPreference: string;
  taxExemptReason: string;
  productUsage: string;
  length: string;
  width: string;
  height: string;
  dimensionUnit: string;
  warranty: string;
  weight: string;
  weightUnit: string;
  manufacturer: string;
  brand: string;
  categories: string;
  rack: string;
  upc: string;
  mpn: string;
  ean: string;
  isbn: string;
  baseCurrency: string;
  sellingPrice: string;
  saleMrp: string;
  salesAccountId: string;
  salesDescription: string;
  costPrice: string;
  purchaseAccountId: string;
  purchaseDescription: string;
  preferredVendorId: string;
  taxRate: string;
  trackInventory: boolean;
  inventoryAccount: string;
  openingStock: string;
  openingStockRatePerUnit: string;
  reorderPoint: string;
  currentStock: string;
  status: string;
  internalManufacturingItem: boolean;
  chooseService: string;
  type: string;
  barCode: string;
}

const initialItemDataState: ItemData = {
  _id: "",
  itemType: "goods",
  itemName: "",
  itemImage: "",
  sku: "",
  unitName: "",
  returnableItem: false,
  hsnCode: "",
  sac: "",
  taxPreference: "Taxable",
  taxExemptReason: "",
  productUsage: "",
  length: "",
  width: "",
  height: "",
  dimensionUnit: "",
  warranty: "",
  weight: "",
  weightUnit: "",
  manufacturer: "",
  brand: "",
  categories: "",
  rack: "",
  upc: "",
  mpn: "",
  ean: "",
  isbn: "",
  baseCurrency: "",
  sellingPrice: "",
  saleMrp: "",
  salesAccountId: "",
  salesDescription: "",
  costPrice: "",
  purchaseAccountId: "",
  purchaseDescription: "",
  preferredVendorId: "",
  taxRate: "",
  trackInventory: false,
  inventoryAccount: "",
  openingStock: "",
  openingStockRatePerUnit: "",
  reorderPoint: "",
  currentStock: "",
  status: "",
  internalManufacturingItem: false,
  chooseService: "",
  type: "",
  barCode: "",
};

const AddProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [itemData, setItemData] = useState<ItemData>(initialItemDataState);
  const { organization } = useOrganization();
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (name: string, value: string | boolean) => {
    setItemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Button onClick={openModal}>
        <CirclePlus size={18} />
        <p className="text-[14px] font-medium">
          <b>Add Product</b>
        </p>
      </Button>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        className="bg-[#f8f7f5] p-6 w-3/4"
      >
        <div>
          <div className="bg-[#ffff] flex items-center py-3">
            <p className="font-bold ">Add Item Product</p>
            <div className="ml-auto">
              <p className="text-2xl font-bold ml-auto">&times;</p>
            </div>
          </div>
          <div className="bg-[#f2f1ed] p-6 rounded-lg overflow-y-scroll hide-scrollbar max-h-[550px]">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3 flex items-center justify-center">
                <div className="border border-dashed border-[#B47300] bg-white w-72 h-40 text-xs flex items-center justify-center rounded-md">
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <Img />
                    </div>
                    <p className="text-[#0B0B0B]">
                      Upload item Image{" "}
                      <span className="text-[#B47300]">browse</span>
                    </p>
                    <p className="text-[#6D6D6D] text-[11px]">
                      Support JPG, PNG
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-9 ">
                <div className="grid grid-cols-2 gap-4 ">
                  <Input
                    label="Model Name"
                    placeholder="Enter Name"
                    value={itemData.itemName}
                    onChange={(e) =>
                      handleInputChange("itemName", e.target.value)
                    }
                  />
                  <Input
                    label="SKU"
                    placeholder="SKU"
                    value={itemData.sku}
                    onChange={(e) => handleInputChange("sku", e.target.value)}
                  />

                  <Select
                    options={[]}
                    label="Unit "
                    placeholder="Select Unit"
                    value={itemData.unitName}
                    onChange={(value) => handleInputChange("unitName", value)}
                  />
                  <Input label="HSN Code" placeholder="HSN" />
                </div>

                <div className="my-2 flex gap-5">
                  <Checkbox
                    label="Returnable Item"
                    checked={itemData.returnableItem}
                    onChange={(checked) =>
                      handleInputChange("returnableItem", checked)
                    }
                  />
                  <Checkbox
                    label="Internal Manufacturing Item"
                    checked={itemData.internalManufacturingItem}
                    onChange={(checked) =>
                      handleInputChange("internalManufacturingItem", checked)
                    }
                  />
                </div>
                {itemData.internalManufacturingItem && (
                  <div className="w-[50%]">
                    <Select
                      options={[]}
                      label="Choose Service "
                      placeholder="Select Service"
                      value={itemData.chooseService}
                      onChange={(value) =>
                        handleInputChange("chooseService", value)
                      }
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 my-3">
              <Input
                label="Bar Code"
                placeholder="Enter Bar code"
                value={itemData.barCode}
                onChange={(e) => handleInputChange("barCode", e.target.value)}
              />
              <Select
                options={[]}
                label="TaxRate "
                placeholder="Select Tax Rate"
                value={itemData.taxRate}
                onChange={(value) => handleInputChange("taxRate", value)}
              />
              <Select
                options={[]}
                label="Tax Preference "
                placeholder="Select Tax Preference"
                value={itemData.taxPreference}
                onChange={(value) => handleInputChange("taxPreference", value)}
              />
            </div>
            <p className="font-semibold text-sm text-text_tertiary mb-2">
              Classification Details
            </p>

            <div className="grid grid-cols-3 gap-x-4 gap-y-1">
              <Select
                options={[]}
                label="Manufacturer"
                placeholder="Select Manufacturer"
                value={itemData.manufacturer}
                onChange={(value) => handleInputChange("manufacturer", value)}
              />{" "}
              <Select
                options={[]}
                label="Brand "
                placeholder="Select Brand"
                value={itemData.brand}
                onChange={(value) => handleInputChange("brand", value)}
              />{" "}
              <Select
                options={[]}
                label="Categories "
                placeholder="Select Categories"
                value={itemData.categories}
                onChange={(value) => handleInputChange("categories", value)}
              />{" "}
              <Select
                options={[]}
                label="Type "
                placeholder="Select Type"
                value={itemData.type}
                onChange={(value) => handleInputChange("type", value)}
              />
              <Select
                options={[]}
                label="Rack "
                placeholder="Select Rack"
                value={itemData.rack}
                onChange={(value) => handleInputChange("rack", value)}
              />
            </div>
            <p className="font-semibold text-sm text-text_tertiary mb-2">
              Purchase Information{" "}
            </p>

            <div className="grid grid-cols-3 gap-x-4 gap-y-1">
              <div className="relative mt-1.5">
                <label
                  className="text-slate-600 flex text-xs items-center gap-2"
                  htmlFor="costPrice"
                >
                  Cost Price
                </label>
                <div className="flex">
                  <div className="w-16 text-xs mt-0.5 rounded-l-[36px] text-start bg-white text-zinc-400 border border-inputBorder h-9 items-center justify-center flex">
                    {organization?.baseCurrency?.toUpperCase() || "INR"}
                  </div>
                  <input
                    type="text"
                    min={0}
                    className={`pl-3 text-xs w-[100%] mt-0.5 rounded-r-[36px] text-start bg-white border border-inputBorder h-9 leading-tight focus:outline-none focus:bg-white focus:border-darkRed 
                      }`}
                    placeholder="Enter Price"
                    name="costPrice"
                    value={itemData.costPrice}
                  />
                </div>
              </div>
              <Select
                options={[]}
                label="Preferred Vendor"
                placeholder="Select Vendor"
                value={itemData.preferredVendorId}
                onChange={(value) =>
                  handleInputChange("preferredVendorId", value)
                }
              />{" "}
              <Select
                options={[]}
                label="Purchase Account  "
                placeholder="Select Account"
                value={itemData.purchaseAccountId}
                onChange={(value) =>
                  handleInputChange("purchaseAccountId", value)
                }
              />
            </div>
            <p className="font-semibold text-sm text-text_tertiary my-2">
              Sales Information{" "}
            </p>

            <div className="grid grid-cols-3 gap-x-4 gap-y-1">
              <div className="relative mt-1.5">
                <label
                  className="text-slate-600 flex text-xs items-center gap-2"
                  htmlFor="sellingPrice"
                >
                  Selleing Price
                </label>
                <div className="flex">
                  <div className="w-16 text-xs mt-0.5 rounded-l-[36px] text-start bg-white text-zinc-400 border border-inputBorder h-9 items-center justify-center flex">
                    {organization?.baseCurrency?.toUpperCase() || "INR"}
                  </div>
                  <input
                    type="text"
                    min={0}
                    className={`pl-3 text-xs w-[100%] mt-0.5 rounded-r-[36px] text-start bg-white border border-inputBorder h-9 leading-tight focus:outline-none focus:bg-white focus:border-darkRed 
                      }`}
                    placeholder="Enter Price"
                    name="sellingPrice"
                    value={itemData.sellingPrice}
                  />
                </div>
              </div>
              <Input
                label="MRP"
                placeholder="Enter MRP"
                value={itemData.saleMrp}
                onChange={(e) => handleInputChange("saleMrp", e.target.value)}
              />{" "}
              <Select
                options={[]}
                label="Sales Account"
                placeholder="Select Account"
                value={itemData.salesAccountId}
                onChange={(value) => handleInputChange("salesAccountId", value)}
              />
            </div>
            <p className="font-semibold text-sm text-text_tertiary my-2">
              Track Inventory For This Item
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <Input
                label="Opening Stock"
                placeholder="Enter Opening Stock"
                value={itemData.openingStock}
                onChange={(e) =>
                  handleInputChange("openingStock", e.target.value)
                }
              />
              <Input
                label="Reorder Point "
                placeholder="Enter reorder point"
                value={itemData.reorderPoint}
                onChange={(e) =>
                  handleInputChange("reorderPoint", e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex items-center justify-end mt-3 gap-4">
            <Button variant="secondary">Cancel</Button>
            <Button>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddProduct;
