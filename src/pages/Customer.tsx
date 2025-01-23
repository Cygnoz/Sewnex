import CheckActive from "../assets/icons/CheckActive"
import CopyBold from "../assets/icons/CopyBold"
import MaleIcon from "../assets/icons/MaleIcon"
import TabClose from "../assets/icons/TabClose"
import HomeCard from "../Components/HomeCards"
import NewCustomer from "../Modules/Customer/NewCustomer"
import SupplierTable from "../Modules/Supplier/SupplierTable"

type Props = {}

function Customer({}: Props) {
  const CustomerDetails = [
    {
      icon: <MaleIcon />,
      title: "All clients",
      description: "Lorem ipsum dolor sit amet",
      number: "75",
    },
    {
      icon: <CheckActive />,
      title: "Active",
      description: "Lorem ipsum dolor sit amet",
      number: "75",
    },
    {
      icon: <TabClose />,
      title: "Inactive",
      description: "Lorem ipsum dolor sit amet",
      number: "75",
    },
    {
      icon: <CopyBold />,
      title: "Duplicate",
      description: "Lorem ipsum dolor sit amet",
      number: "75",
    }
  ]
  return (
    <div>
    <div className="flex justify-between ">
      <div>
      <h1 className="text-[#0B1320] text-[16px] font-bold">
        Customer
      </h1>
      <p className="text-[#818894] text-[12px] font-normal">
        Lorem ipsum dolor sit amet consectetur. Commodo enim odio fringilla
      </p>
      </div>
      {/* <AddSupplierModal page="add" /> */}
      <NewCustomer page="add"/>
    </div>
    <div className="grid grid-cols-4 gap-4 py-3">
      {
        CustomerDetails.map((details) => (
          <HomeCard icon={details.icon} title={details.title} description={details.description} number={details.number} />
        ))
      }
    </div>
    <div>
      <SupplierTable />
    </div>

  </div>  )
}

export default Customer