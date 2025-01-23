import LineImg from '../assets/images/LineImg.png';
import ArrowRightUpImg from '../assets/images/ArrowRightUpImg.png'

import ArrowUpRight from '../assets/icons/ArrowUpRight';

const Report = () => {
  const cards = [
    {
      id: 1,
      title: "Profit and Loss",
      description: "Analyze profit and loss trends over time for better decisions.",
      arrowImage: ArrowRightUpImg,
    },
    // Remaining cards...
  ];

  return (
    <div>
  <div className=' justify-between'>
      <h1 className="text-[#0B1320] text-[16px] font-bold">
        Reports
      </h1>
      <p className="text-[#818894] text-[12px] font-normal">
        Lorem ipsum dolor sit amet consectetur. Commodo enim odio fringilla
      </p>
      </div>
            <div className="grid grid-cols-3 gap-6 py-6 mb-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-[#E6EDED]  h-[195px] w-[375px] rounded-[12px]  shadow-md p-4 flex flex-row items-center "
          >
            {/* First Column: Number and Arrow Image */}
            <div className="flex flex-col items-center w-1/3">
              <div className="text-[40px] font-semibold text-[#495160] mb-4">{card.id}</div>
              <div className="w-full h-12 flex items-center justify-center">
                <img src={card.arrowImage} className='h-[21.5px] w-[35.95px] text-[#004D4D]' alt="Arrow" /> {/* Render arrowImage directly */}
              </div>
            </div>

            {/* Second Column: Line/Image */}
            <div className="w-1/12 flex items-center justify-start">
              <img src={LineImg} className="h-[150px] w-0.5" alt="Line" />
            </div>

            {/* Third Column: Title, Description, Button, and Arrow Icon */}
            <div className="flex flex-col justify-between w-2/3">
              <div>
                <h2 className="text-[16px] font-bold text-[#0B1320] mt-1">{card.title}</h2>
                <p className="text-[12px] font-normal text-[#818894] ">{card.description}</p>
              </div>
              <div className="flex justify-between items-center mt-4 mr-3">
                <button className="bg-[#FFFFFF] font-bold text-[#495160] m-3 w-[163px] h-[34px] rounded-[36px]">
                  View More
                </button>
                <div className="w-10 h-10 bg-white rounded-full object-cover flex items-center justify-center shadow">
                  <ArrowUpRight size={15} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Report;
