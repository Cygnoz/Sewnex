import { useState } from "react"
import RadioButton from "../../../Components/Form/RadioButton"
import Banner from "../Organization/Banner"
import Button from "../../../Components/Button"
import ToggleButton from "../../../Components/ToggleButton"

type Props = {}

function OrderSettings({ }: Props) {
    const [preference, sePreferremce] = useState("")
    const OnChange = (value: string) => {
        sePreferremce(value)
        console.log(preference);
    }
    const [isToggled, setIsToggled] = useState(false);
    const handleToggle = (state: boolean) => {
        setIsToggled(state)
        console.log(isToggled);
    };
    return (
        <div>
            <Banner seeOrgDetails />
            <div>
                <div className="bg-[#FFFFFF] p-5 mt-3 rounded-lg">
                    <h1 className="text-[#303F58] text-[14px] font-bold">Set Date Assignment Preference</h1>
                    <div className="flex gap-10">
                        <div className="py-3">
                            <div className="flex justify-start pb-2">
                                <RadioButton id="orderwise" label="Order Wise" name="AssignmenDate" onChange={OnChange} selected={preference} className="text-[#495160] text-[14px] font-semibold" />
                            </div>
                            <p className="text-[#818894] text-[14px] font-normal">
                                Set one delivery and trial date for the entire order
                            </p>
                        </div>
                        <div className="py-3">
                            <div className="flex justify-start pb-2">
                                <RadioButton id="itemwise" label="Item Wise" name="AssignmenDate" onChange={OnChange} selected={preference} className="text-[#495160] text-[14px] font-semibold" />
                            </div>
                            <p className="text-[#818894] text-[14px] font-normal">
                                Set one delivery and trial date for the entire order
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#FFFFFF] p-5 mt-3 rounded-lg">
                    <h1 className="text-[#303F58] text-[14px] font-bold">Apply Tax to Orders</h1>
                    <div className="flex gap-10 pt-3">
                        <div className="flex justify-start pb-2">
                            <RadioButton id="taxable" label="Taxable" name="Tax" onChange={OnChange} selected={preference} className="text-[#495160] text-[14px] font-semibold" />
                        </div>
                        <div className="flex justify-start pb-2">
                            <RadioButton id="nontaxable" label="Non - Taxable" name="Tax" onChange={OnChange} selected={preference} className="text-[#495160] text-[14px] font-semibold" />
                        </div>
                    </div>
                    <p className="text-[#818894] text-[14px] font-normal">
                        Control whether orders are taxable or non-taxable. Enable this option to apply tax rates during order creation
                    </p>
                </div>
                <div className="bg-[#FFFFFF] p-5 mt-3 rounded-lg">
                    <h1 className="text-[#303F58] text-[14px] font-bold">Fabric</h1>
                    <div className="flex gap-10 pt-3">
                        <div className="flex justify-start pb-2">
                            <ToggleButton
                                isOn={true}
                                onColor="bg-[#C88000]"
                                offColor="bg-white"
                                onToggle={handleToggle}
                                size="small"
                            />
                        </div>
                    </div>
                    <p className="text-[#818894] text-[14px] font-normal">
                        Include fabric selection as a step in the order creation process. Turn off if fabric choice is not required for your workflow
                    </p>
                </div>
                <div className="flex justify-end gap-3 py-3">
                    <Button variant="secondary">
                        Cancel
                    </Button>
                    <Button>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default OrderSettings