import { Link } from "react-router-dom"
import CirclePlus from "../../../assets/icons/CirclePlus"
import Button from "../../../Components/Button"

type Props = {}

function ManualJournalHome({}: Props) {
  return (
    <div>
         <div className="flex justify-between items-center">
        <div>
    <h1 className="text-base font-bold text-heading">Manual journal</h1>
    <p className="text-subHeading mt-2 text-xs">Lorem ipsum dolor sit amet consectetua egestas consectetur amet.</p>
        </div>
        <div>
        <Link to={"/accountant/newJournal"}>
        <Button>
        <CirclePlus />
        <p>New Journal</p>
      </Button>
        </Link>
        </div>
    </div>
    </div>
  )
}

export default ManualJournalHome