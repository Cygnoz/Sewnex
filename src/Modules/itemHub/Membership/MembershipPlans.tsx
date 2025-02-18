import BackIcon from '../../../assets/icons/BackIcon'
import { useNavigate } from 'react-router-dom';
import AddPlans from './AddPlans';

type Props = {}

const MembershipPlans = ({}: Props) => {
    const navigate = useNavigate();

  return (
    <div> <div className="flex items-center justify-between gap-4">
    <button onClick={() => navigate("/itemhub")}>
      <BackIcon />
    </button>
    <div>
      <h1 className="text-base font-bold text-heading">Retail Product</h1>
      <p className="text-[#495160] mt-2 text-xs">
        Add and manage your styles and parameters of services
      </p>
    </div>
    <div className=" ml-auto">
      <AddPlans />
    </div>
  </div></div>
  )
}

export default MembershipPlans