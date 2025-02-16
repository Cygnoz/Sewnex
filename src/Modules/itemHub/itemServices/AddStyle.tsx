import ArrowUpRightIcon from "../../../assets/icons/ArrowUpRighIcon";
import bgImage from "../../../assets/images/rb_2148833203 1.png";

type Props = {};

function AddStyle({}: Props) {
  return (
    <div className="w-[40%]">
      <div className="bg-gradient-to-b from-[#F7ECD9] to-[#B5F0D3] py-4 px-6 rounded-2xl flex justify-between items-center">
        <div className="w-[50%]">
          <p className="text-[#0B1320] font-bold text-base">Add Style</p>
          <p className="text-[#495160] text-xs mt-2">
            Add manage and personalize your styles in this section.
          </p>
        </div>
        <img src={bgImage} className="w-32 top-[22.3%] absolute right-28 object-contain" alt="" />
        <div>
          <ArrowUpRightIcon
            height="44"
            width="44"
            size="20"
            bgColor="#2C3E50"
          />
        </div>
      </div>
    </div>
  );
}

export default AddStyle;
