import { useNavigate } from "react-router-dom";
import CirclePlus from "../../assets/icons/circleplus";
import Button from "../../Components/Button";

// import other assets as needed

type Props = {};

const AddExpenseModal = ({}: Props) => {
  const navigate = useNavigate();

  const handleAddExpenseClick = () => {
    navigate("/expense/add-expense");
  };

  return (
    <div>
      <div>
        <Button
          onClick={handleAddExpenseClick}
          variant="primary"
          className="flex items-center"
          size="sm"
        >
          <CirclePlus color="white" size={14} />{" "}
          <p className="text-md">Add Expense</p>
        </Button>
      </div>
    </div>
  );
};

export default AddExpenseModal;

