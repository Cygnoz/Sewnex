import { useEffect, useState, ReactNode } from "react";
import { RecieptIndian } from "../../assets/icons/RecieptIndian";
import { ExpenseMileage } from "../../assets/icons/ExpenseMileage";

interface ExpenseFilterCardProps {
  onSelectSection: (section: "expense" | "mileage") => void;
}

interface Supplier {
  icon: ReactNode;
  title: string;
  section: "expense" | "mileage";
}

const ExpenseFilterCards: React.FC<ExpenseFilterCardProps> = ({
  onSelectSection,
}) => {
  const [selected, setSelected] = useState<string>("Record Expense");

  const Suppliers: Supplier[] = [
    {
      icon: <RecieptIndian />,
      title: "Record Expense",
      section: "expense",
    },
    {
      icon: <ExpenseMileage />,
      title: "Record Mileage",
      section: "mileage",
    },
  ];

  const handleClick = (title: string, section: "expense" | "mileage") => {
    setSelected(title);
    onSelectSection(section);
  };

  useEffect(() => {
    onSelectSection("expense");
  }, []);

  return (
    <div className="flex gap-3 justify-start mx-5">
      {Suppliers.map((supplier) => (
        <button
          key={supplier.title}
          onClick={() => handleClick(supplier.title, supplier.section)}
          className={`flex gap-2 p-2 w-[20%] justify-center rounded ${
            selected === supplier.title ? "bg-[#F7ECD9]" : "bg-white"
          }`}
          style={{ border: "1px solid #DADBDD" }}
        >
          {supplier.icon}
          <span
            style={{ color: "#4B5C79", fontSize: "12px", fontWeight: "600" }}
          >
            {supplier.title}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ExpenseFilterCards;
