import React, { useContext, useEffect, useState } from "react";
import Button from "../../../../../Components/Button";
import Modal from "../../../../../Components/modal/Modal";
import ArrowUpRightIcon from "../../../../../assets/icons/ArrowUpRighIcon";
import Table from "../../../../../Components/Table/Table";
import UnitModal from "./UnitModal";
import { endpoints } from "../../../../../Services/apiEdpoints";
import useApi from "../../../../../Hooks/useApi";
import toast from "react-hot-toast";
import { UnitResponseContext } from "../../../../../Context/ContextShare";

type Props = {};

const Unit = (props: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [allunitData, setAllunitData] = useState<any[]>([]);
  const { request: fetchAllunits } = useApi("get", 5003);
  const [loading, setLoading] = useState({
    skeleton: false,
    noDataFound: false,
  });
  const { unitResponse } = useContext(UnitResponseContext)!;
  const { request: deletemanufacturerRequest } = useApi("delete", 5003);

  const closeModal = () => {
    setModalOpen(false);
  };
  const openModal = () => {
    setModalOpen(true);
  };

  const Columns = [
    { id: "unitName", label: "Unit Name ", visible: true },
    { id: "symbol", label: "Symbol", visible: true },
    { id: "quantityCode", label: " Unit Quantity Code", visible: true },
    { id: "precision", label: "Unit Precession", visible: true },
  ];

  const loadUnit = async () => {
    try {
      setLoading({ ...loading, skeleton: true, noDataFound: false });

      const url = `${endpoints.GET_ALL_UNIT}`;
      const { response, error } = await fetchAllunits(url);
      if (!error && response) {
        setAllunitData(response.data);
        setLoading({ ...loading, skeleton: false });
      } else {
        console.error("Failed to fetch unit data.");
        setLoading({ ...loading, skeleton: false, noDataFound: true });
      }
    } catch (error) {
      toast.error("Error in fetching unit data.");
      console.error("Error in fetching unit data", error);
      setLoading({ ...loading, skeleton: false, noDataFound: true });
    }
  };

  const handleDelete = async (unitId: string) => {
    try {
      const url = `${endpoints.DELETE_UNIT}/${unitId}`;
      const { response, error } = await deletemanufacturerRequest(url);
  
      if (!error && response) {
        toast.success(response.data.message);
        setAllunitData((prevData) => prevData.filter((unit) => unit._id !== unitId));
      } else {
        toast.error(error?.response?.data?.message || "Failed to delete unit.");
      }
    } catch (error) {
      toast.error("Error occurred while deleting unit.");
      console.error("Delete error:", error);
    }
  };
  
  useEffect(() => {
    loadUnit();
  }, [unitResponse]);
  return (
    <div>
      <div className="bg-white text-balck h-14 flex items-center gap-3 justify-center py-3 px-3 rounded-lg">
        <div>
          <p className="font-bold text-sm text-[#0B1320]">Unit</p>
          <p className="text-xs text-[#495160] whitespace-nowrap">
            Lorem ipsum dolor sit amet cons
          </p>
        </div>
        <button
          className="bg-[#2C3E50] h-8 w-8 rounded-full flex items-center justify-center"
          onClick={openModal}
        >
          <ArrowUpRightIcon size="20" />
        </button>
      </div>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        className="w-[70%] text-start px-7 py-6 bg-[#f2f1ed]"
      >
        <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-[#ffff]">
          <p className="font-bold">Unit Of Measurement</p>
          <button className="flex gap-2 items-center">
            <UnitModal />
          </button>
        </div>
        <Table
          columns={Columns}
          data={allunitData}
          loading={loading.skeleton}
          searchableFields={["unitName"]}
          onDelete={(item:any) => handleDelete(item)}
                    renderActions={(item) => (
            <div>
              <UnitModal funtion="edit" unit={item} />
            </div>
          )}
        />

        <div className="flex justify-end gap-2 mt-4">
          <Button
            onClick={closeModal}
            variant="secondary"
            className="text-sm font-semibold"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Unit;
