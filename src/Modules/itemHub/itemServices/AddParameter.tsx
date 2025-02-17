import ArrowUpRightIcon from "../../../assets/icons/ArrowUpRighIcon";

type Props = {};

function AddParameter({}: Props) {
  return (
    <div className="w-[30%]">
      <div className="bg-white py-4 px-6 rounded-2xl flex justify-between items-center">
        <div className="w-[65%]">
          <p className="text-[#0B1320] font-bold text-base">Add Parameter</p>
          <p className="text-[#495160] text-xs mt-2">
            Add and manage your parameters in this section.
          </p>
        </div>
        <ArrowUpRightIcon height="44" width="44" size="20" bgColor="#2C3E50" />
      </div>
    </div>
  );
}

export default AddParameter;
