import { Link } from "react-router-dom"
import BackIcon from "../../../../assets/icons/BackIcon"
import Input from "../../../../Components/Form/Input"
import Select from "../../../../Components/Form/Select"

type Props = {}

function NewJournal({}: Props) {
  return (
    <div>
   <div className="flex items-center gap-4">
   <Link to={"/accountant/manualJournal"}>
    <BackIcon/>
    </Link>
    <p className="text-base font-bold text-heading">Create Manual Journal</p>
   </div>
   
   <div className="bg-white p-6 rounded-2xl mt-3">
   <div className="grid gap-5 p-4">
          <div className="flex items-center justify-between w-full gap-9">
            <div className="w-[40%]">
              <label className="block text-sm text-text_tertiary mb-2">Date</label>
              <Input placeholder="Select date"/>
            </div>
            <div className="w-[26%]">
              <label className="block text-sm text-text_tertiary mb-2">Journal#</label>
            <Input placeholder="Enter Journal"/>
            </div>
            <div className="w-[40%]">
              <label className="block text-sm text-text_tertiary mb-2">Reference#</label>
             <Input placeholder="Enter refrence"/>
            </div>
          </div>

          <div className="flex items-center justify-between w-full gap-9">
            <div className="w-[50%]">
              <label className="block text-sm text-text_tertiary mb-2">Notes</label>
              <Input placeholder="Enter Notes"/>
            </div>
            <div className="w-[26%]">
              <label className="block text-sm text-text_tertiary mb-2">
                Journal Type
              </label>
              <div className="flex items-center justify-start mt-3">
                <input
                  type="checkbox"
                    id="checkbox3"
                  className="h-[16px] w-[16px] accent-[#97998E]"
                />
                <label  htmlFor="checkbox3" className="text-sm cursor-pointer font-semibold text-[#2C3E50] ms-3">
                  Cash based journal ?
                </label>
              </div>
            </div>
            <div className="w-[50%]">
              <label className="block text-sm text-text_tertiary mb-2">Currency</label>
              <Select options={[]} placeholder="Select Currency"/>
             
            </div>
          </div>
        </div>

   </div>
    </div>
  )
}

export default NewJournal