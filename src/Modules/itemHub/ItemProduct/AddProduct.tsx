import { useContext, useEffect, useState } from "react";
import CirclePlus from "../../../assets/icons/CirclePlus";
import Button from "../../../Components/Button";
import Modal from "../../../Components/modal/Modal";
import Img from "../../../assets/icons/Img";
import Input from "../../../Components/Form/Input";
import Select from "../../../Components/Form/Select";
import Checkbox from "../../../Components/Form/Checkbox";
import { useOrganization } from "../../../Context/OrganizationContext";
import useApi from "../../../Hooks/useApi";
import { endpoints } from "../../../Services/apiEdpoints";
import toast from "react-hot-toast";
import EditIcon from "../../../assets/icons/EditIcon";
import { BmcrReponseContext, ProductResponseContext, UnitResponseContext } from "../../../Context/ContextShare";
import UnitModal from "./BMCRU/Unit/UnitModal";
import ManufacturerModal from "./BMCRU/Manufacturer/ManufacturerModal";
import BrandModal from "./BMCRU/Brand/BrandModal";
import CategoryModal from "./BMCRU/Category/CategoryModal";
import RackModal from "./BMCRU/Rack/RackModal";

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

type Props = { page?: string; id?: string };

const AddProduct = ({ page, id }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [itemData, setItemData] = useState<ItemData>(initialItemDataState);
  const [unitData, setUnitData] = useState<any>([]);
  const [manufacturerdata, setManufacturerdata] = useState<any>([]);
  const [rackData, setRackdata] = useState<any>([]);
  const [categoryData, setCategoryData] = useState<any>([]);
  const [branddata, setBrandData] = useState<any>([]);
  const [supplierData, setSupplierData] = useState<any>([]);
  const [taxData, setTaxData] = useState<any>([]);
  const [allAccounts, setAllAccounts] = useState<any>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const { request: getAccounts } = useApi("get", 5001);
  const { request: getBMCR } = useApi("put", 5003);
  const { request: getUnit } = useApi("get", 5003);
  const { request: getsuppleir } = useApi("get", 5009);
  const { request: updateItem } = useApi("put", 5003);
  const { request: addItem } = useApi("post", 5003);
  const { setProductResponse } = useContext(ProductResponseContext)!;
    const { unitResponse } = useContext(UnitResponseContext)!;
    const { bmcrResponse } = useContext(BmcrReponseContext)!;

  const { organization } = useOrganization();
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setItemData(initialItemDataState);
  };

  const handleInputChange = (name: string, value: File | string | boolean) => {
    if (name === "itemImage" && value instanceof File) {
      const reader = new FileReader();
      reader.readAsDataURL(value);

      reader.onload = () => {
        if (reader.result) {
          setItemData((prevData) => ({
            ...prevData,
            itemImage: reader.result as string,
          }));
        }
      };

      reader.onerror = (error) => {
        console.error("Error converting file to Base64:", error);
      };
    } else {
      setItemData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const fetchData = async (
    url: string,
    setData: React.Dispatch<React.SetStateAction<any>>,
    fetchFunction: (url: string, body?: any) => Promise<any>,
    body?: any
  ) => {
    try {
      const { response, error } = await fetchFunction(url, body);
      if (!error && response) {
        setData(response.data);
      } else {
        console.error("Error in response or no data received:", error);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSaving) return;

    setIsSaving(true);
    try {
      const url =
        page === "edit" ? `${endpoints.UPDATE_ITEM}/${id}` : `${endpoints.ADD_ITEM}`;
      const apiCall = page === "edit" ? updateItem : addItem;

      const { response, error } = await apiCall(url, itemData);

      if (!error && response) {
        toast.success(response.data.message);
        closeModal();
        setProductResponse((prevData: any) => ({
          ...prevData,
          data: response.data,
        }));
      } else {
        toast.error(error.response.data.message);
      }
    } catch (error) {
      toast.error("Error in save operation.");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const BMCRurl = `${endpoints.GET_ALL_BRMC}`;
    const getUnitUrl = `${endpoints.GET_ALL_UNIT}`;
    const supplerUrl = `${endpoints.GET_ALL_SUPPLIER}`;
    const allAccountsUrl = `${endpoints.Get_ALL_Acounts}`;
    const taxUrl = `${endpoints.GET_ALL_ITEMS_Dropdown}`;

    if (page === "edit" && id) {
      const itemUrl = `${endpoints.GET_ONE_ITEM}/${id}`;
      fetchData(itemUrl, setItemData, getUnit);
    }

    fetchData(allAccountsUrl, setAllAccounts, getAccounts);
    fetchData(BMCRurl, setBrandData, getBMCR, { type: "brand" });
    fetchData(BMCRurl, setRackdata, getBMCR, { type: "rack" });
    fetchData(BMCRurl, setCategoryData, getBMCR, { type: "category" });
    fetchData(BMCRurl, setManufacturerdata, getBMCR, { type: "manufacturer" });
    fetchData(getUnitUrl, setUnitData, getUnit);
    fetchData(supplerUrl, setSupplierData, getsuppleir);
    fetchData(taxUrl, setTaxData, getUnit);
  }, [unitResponse,bmcrResponse]);

  useEffect(()=>{
    if(itemData.taxPreference==="Taxable"){
      setItemData((prevData)=>({
        ...prevData,
        taxExemptReason:""
        
    }))
    }
    else if(itemData.taxPreference==="Non-Taxable"){
      setItemData((prevData)=>({
        ...prevData,
        taxRate:""
        
    }))
    }
  },[itemData.taxPreference])

  useEffect(()=>{
    if(itemData.costPrice && itemData.purchaseAccountId===""){
      setItemData((prevData)=>({
        ...prevData,
        purchaseAccountId:"679c57f2fb0228937ffe1050"
      }))
    }
    if(itemData.sellingPrice && itemData.salesAccountId===""){
      setItemData((prevData)=>({
        ...prevData,
        salesAccountId:"679c57f2fb0228937ffe1041"
      }))
    }
  },[itemData.costPrice, itemData.sellingPrice])
  

  console.log(itemData.salesAccountId)

  return (
    <div>
      {page === "edit" ? (
        <div className="flex  items-center justify-center"> <button onClick={openModal} className="">
          {" "}
         <EditIcon color={"#C88000"} />
        </button></div>
      ) : (
        <Button onClick={openModal}>
          <CirclePlus size={18} />
          <p className="text-[14px] font-medium">
            <b>Add Product</b>
          </p>
        </Button>
      )}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        className="bg-[#f8f7f5] p-6 w-3/4 text-start"
      >
        <div>
          <div className="bg-[#ffff] flex items-center py-3">
            <p className="font-bold ">
              {page === "edit" ? "Edit" : "Add"} Item Product
            </p>
            <button onClick={closeModal} className="ml-auto">
              <p className="text-2xl font-bold ml-auto">&times;</p>
            </button>
          </div>
          <form>
            <div className="bg-[#f2f1ed] p-6 rounded-lg overflow-y-scroll hide-scrollbar max-h-[550px]">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3 flex items-center justify-center">
                  <div className="border border-dashed border-[#B47300] bg-white w-72 h-40 text-xs flex items-center justify-center rounded-md">
                    {itemData.itemImage ? (
                      <img
                        src={itemData.itemImage}
                        alt="Uploaded"
                        className="h-full w-full object-fill rounded-md"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="flex items-center justify-center">
                          <Img />
                        </div>
                        <p className="text-[#0B0B0B]">
                          Upload Image{" "}
                          <span
                            className="text-[#B47300] cursor-pointer"
                            onClick={() =>
                              document.getElementById("image-upload")?.click()
                            }
                          >
                            browse
                          </span>
                        </p>
                        <p className="text-[#6D6D6D] text-[11px]">
                          Support JPG, PNG
                        </p>
                      </div>
                    )}

                    {/* Hidden file input */}
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/png, image/jpeg"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleInputChange("itemImage", e.target.files[0]);
                        }
                      }}
                      className="hidden"
                    />
                  </div>
                </div>
                <div className="col-span-9 ">
                    <div className="grid grid-cols-2 gap-4 ">
                    <Input 
                    required
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
                      options={unitData.map((unit: any) => ({
                      label: unit.unitName,
                      value: unit.unitName,
                      }))}
                      label="Unit "
                      placeholder="Select Unit"
                      value={itemData.unitName}
                      onChange={(value) => handleInputChange("unitName", value)}
                      addNew={<UnitModal funtion={"product"} />}
                    />
                    <Input
                      label="HSN Code"
                      placeholder="HSN"
                      value={itemData.hsnCode}
                      onChange={(e) =>
                      handleInputChange("hsnCode", e.target.value)
                      }
                    />
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
                />{" "}
                <Select
                required
                  options={[
                    { value: "Taxable", label: "Taxable" },
                    { value: "Non-Taxable", label: "Non-Taxable" },
                  ]}
                  label="Tax Preference "
                  placeholder="Select Tax Preference"
                  value={itemData.taxPreference}
                  onChange={(value) =>
                    handleInputChange("taxPreference", value)
                  }
                />
                {itemData.taxPreference === "Taxable" ? (
                  <Select
                  required
                  options={taxData?.taxRate?.map((rate: any) => ({
                    label: rate.taxName,
                    value: rate.taxName,
                  }))}
                  label="TaxRate "
                  placeholder="Select Tax Rate"
                  value={itemData.taxRate}
                  onChange={(value) => handleInputChange("taxRate", value)}
                  />
                ) : (
                  <Input
                  required
                  label="Tax Exempt Reason"
                  placeholder="Enter Tax Exempt Reason"
                  value={itemData.taxExemptReason}
                  onChange={(e) =>
                    handleInputChange("taxExemptReason", e.target.value)
                  }
                  />
                )}
              </div>
              <p className="font-semibold text-sm text-text_tertiary mb-2">
                Classification Details
              </p>

              <div className="grid grid-cols-3 gap-x-4 gap-y-1">
                <Select
                  options={manufacturerdata.map((manufacturer: any) => ({
                    label: manufacturer.manufacturerName,
                    value: manufacturer.manufacturerName,
                  }))}
                  label="Manufacturer"
                  placeholder="Select Manufacturer"
                  value={itemData.manufacturer}
                  onChange={(value) => handleInputChange("manufacturer", value)}
                  addNew={<ManufacturerModal funtion="product"/>}
                />{" "}
                <Select
                  options={branddata.map((brand: any) => ({
                    label: brand.brandName,
                    value: brand.brandName,
                  }))}
                  label="Brand "
                  placeholder="Select Brand"
                  value={itemData.brand}
                  onChange={(value) => handleInputChange("brand", value)}
                  addNew={<BrandModal funtion="product"/>}

                />{" "}
                <Select
                  options={categoryData.map((categories: any) => ({
                    label: categories.categoriesName,
                    value: categories.categoriesName,
                  }))}
                  label="Categories "
                  placeholder="Select Categories"
                  value={itemData.categories}
                  onChange={(value) => handleInputChange("categories", value)}
                  addNew={<CategoryModal funtion="product"/>}

                />{" "}
                <Select
                  options={[
                    { value: "Fabric", label: "Fabric" },
                    { value: "Raw Material", label: "Raw Material" },
                    { value: "Ready Made", label: "Ready Made" },
                  ]}
                  label="Type "
                  placeholder="Select Type"
                  value={itemData.type}
                  onChange={(value) => handleInputChange("type", value)}
                />
                <Select
                  options={rackData.map((unit: any) => ({
                    label: unit.rackName,
                    value: unit.rackName,
                  }))}
                  label="Rack "
                  placeholder="Select Rack"
                  value={itemData.rack}
                  onChange={(value) => handleInputChange("rack", value)}
                  addNew={<RackModal page="product"/>}

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
  className={`pl-3 text-xs w-[100%] mt-0.5 rounded-r-[36px] text-start bg-white border border-inputBorder h-9 leading-tight focus:outline-none focus:bg-white focus:border-darkRed`}
  placeholder="Enter Price"
  name="costPrice"
  value={itemData.costPrice}
  onChange={(e) => {
    const regex = /^[+]?[0-9]*\.?[0-9]+$/;
    const value = e.target.value;

    if (regex.test(value) || value === '') {
      handleInputChange("costPrice", value);
    }
  }}
/>

                  </div>
                </div>
                <Select
                  options={supplierData?.map((supplier: any) => ({
                    label: supplier?.supplierDisplayName,
                    value: supplier?._id,
                  }))}
                  label="Preferred Vendor"
                  placeholder="Select Vendor"
                  value={itemData.preferredVendorId}
                  onChange={(value) =>
                    handleInputChange("preferredVendorId", value)
                  }
                />{" "}
                <Select
                  options={allAccounts
                    ?.filter(
                      (item: { accountSubhead: string }) =>
                        item.accountSubhead === "Cost of Goods Sold"
                    )
                    ?.map((item: { _id: string; accountName: string }) => ({
                      label: item.accountName,
                      value: item._id,
                    }))}
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
  className={`pl-3 text-xs w-[100%] mt-0.5 rounded-r-[36px] text-start bg-white border border-inputBorder h-9 leading-tight focus:outline-none focus:bg-white focus:border-darkRed`}
  placeholder="Enter Price"
  name="sellingPrice"
  value={itemData.sellingPrice}
  onChange={(e) => {
    const regex = /^[+]?[0-9]*\.?[0-9]+$/; 
    const value = e.target.value;

    if (regex.test(value) || value === '') {
      handleInputChange("sellingPrice", value);
    }
  }}
/>

                  </div>
                </div>
                <Input
                                type="number"

                  label="MRP"
                  placeholder="Enter MRP"
                  value={itemData.saleMrp}
                  onChange={(e) => handleInputChange("saleMrp", e.target.value)}
                />{" "}
                <Select
                  options={allAccounts
                    ?.filter(
                      (item: { accountSubhead: string }) =>
                        item.accountSubhead === "Sales"
                    )
                    ?.map((item: { _id: string; accountName: string }) => ({
                      label: item.accountName,
                      value: item._id,
                    }))}
                  label="Sales Account"
                  placeholder="Select Account"
                  value={itemData.salesAccountId}
                  onChange={(value) =>
                    handleInputChange("salesAccountId", value)
                  }
                />
              </div>
              <p className="font-semibold text-sm text-text_tertiary my-2">
                Track Inventory For This Item
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <Input 
                type="number"
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
          </form>
          <div className="flex items-center justify-end mt-3 gap-4">
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddProduct;
