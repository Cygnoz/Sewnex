import { useState } from 'react';
import Button from '../../Components/Button';
import CasualPant from  '../../assets/images/CasualPant.png'
import ItemMeasurementModal from './Modal/ItemMeasurementModal';


const ItemMeasurement = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);




  const items = [
    {
      item: 'Casual pant',
      measuredBy: 'Praveen Kumar',
      orderNo: 'ODR7678',
      imgSrc:CasualPant,
    },
    {
      item: 'Full Sleeve Shirt',
      measuredBy: 'Vinod Pavan',
      orderNo: 'ODR7678',
      imgSrc: CasualPant,
    },
    {
      item: 'Men’s Blazer',
      measuredBy: 'Bilal John',
      orderNo: 'ODR7678',
      imgSrc: CasualPant,
    },
    {
      item: 'Churidar',
      measuredBy: 'John Kombanad',
      orderNo: 'ODR7678',
      imgSrc: CasualPant,
    },
  ];


  const handleViewClick = (item:any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  return (
   <div className='m-2 h-[237px] rounded-lg bg-[#F5F8FC]'>
     <div className="flex flex-wrap justify-center gap-4 p-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-xl p-4 w-[300px] h-[205px] flex flex-col"
        >
          {/* Main Content */}
          <div className="flex justify-between mb-4">
            {/* First Column: 6 Rows */}
            <div>
              <div className="text-[11px] font-normal text-[#495160]">Item</div>
              <div className="text-[12px] font-semibold mb-2">{item.item}</div>

              <div className="text-[11px] font-normal text-[#495160]">
                Measured by
              </div>
              <div className="text-[12px] font-semibold mb-2">
                {item.measuredBy}
              </div>

              <div className="text-[11px] font-normal text-[#495160]">
                Order no
              </div>
              <div className="text-[12px] font-semibold">{item.orderNo}</div>
            </div>

            {/* Second Column: Image */}
            <div>
              <img
                src={item.imgSrc}
                alt={item.item}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
          </div>

          <Button variant="secondary"
           size="sm"
            className='flex justify-center'
            onClick={() => handleViewClick(item)}
            >
            
            <p className="text-sm  font-medium">View</p>
          </Button>         
        </div>
      ))}
    </div>

      {/* Modal */}
      {isModalOpen && (
        <ItemMeasurementModal item={selectedItem} onClose={closeModal} />
      )}
   </div>
  );
};

export default ItemMeasurement;
