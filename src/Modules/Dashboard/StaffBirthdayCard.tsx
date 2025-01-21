import { useState } from "react"
import birthdaycard2img from "../../assets/images/birthdaycard2img.png"
import Modal from "../../Components/modal/Modal"
import Ellipse45 from "../../assets/images/Ellipse 45.png"
import Ellipse46 from "../../assets/images/Ellipse 46.png"
import Ellipse47 from "../../assets/images/Ellipse 47.png"
import Ellipse48 from "../../assets/images/Ellipse 48.png"
import Button from "../../Components/Button"

function StaffBirthdayCard() {
  const avatarImages = [Ellipse45, Ellipse46, Ellipse47, Ellipse48]
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCardClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="flex p-4 rounded-md">
        {/* Customer Birthday */}
        <div className="relative w-full max-w-4xl bg-[#B5F0D3] h-40 rounded-2xl overflow-hidden cursor-pointer" onClick={handleCardClick}>
          {/* Background Image */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${birthdaycard2img})`,
              backgroundPosition: "center -110px",
            }}
          />

          <div className="relative flex flex-col p-6 w-full h-full">
            {/* Top Row: Heading and Avatar Group */}
            <div className="flex items-center justify-end mb-4">
              <div className="flex -space-x-2">
                {avatarImages.map((image, index) => (
                  <div key={index} className="w-7 h-7 rounded-full border-none overflow-hidden">
                    <img src={image} alt={`Birthday person ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <h2 className="text-[#004d4d] text-xl font-bold">Today's Staff Birthday</h2>
              {/* Avatar Row */}
            </div>
            {/* arrow btn */}
            <div className="flex justify-end items-center">
              <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors" aria-label="View birthdays">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Today's Staff Birthday</h3>
          <div className="space-y-4">
            {[
              { name: "Teresa Philip", phone: "8978679867", image: Ellipse45 },
              { name: "Divya Das", phone: "8979079867", image: Ellipse46 },
              { name: "Peter Joy", phone: "8989679867", image: Ellipse47 },
              { name: "Raj B Shetty", phone: "8978679867", image: Ellipse48 },
            ].map((person, index) => (
              <div key={index} className="flex items-center justify-between border p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <img src={person.image} alt={person.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold">{person.name}</p>
                    <p className="text-sm text-gray-600">{person.phone}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {/* <button className="bg-green-500 text-white px-4 py-1 rounded-md">
                    WhatsApp
                  </button> */}
                  <Button variant="primary" className="flex items-center" size="lg">
                    <p className="text-md">WhatAapp</p>
                  </Button>
                  <Button variant="tertiary" className="flex items-center" size="lg">
                    <p className="text-md">SEND SMS</p>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <Button variant="primary" className="flex items-center" size="lg" onClick={handleCloseModal}>
              <p className="text-md">Close</p>
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default StaffBirthdayCard
