import { useState } from "react"
import { Link } from "react-router-dom"
import BookingForm from "./BookingForm"
import ImageWithSkeleton from "./ImageWithSkeleton"
import { formatDate } from "../utils/dateFormatter"

const TourCard = ({ _id, title, description, duration, price, image, link, slug, date }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div data-reveal className="reveal bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="w-full h-64">
          <ImageWithSkeleton src={image || "/placeholder.svg"} alt={title} className="w-full h-64" />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-green-700">{title}</h3>
            <div className="text-right">
              <div className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">{duration}</div>
              {date && <div className="text-xs text-gray-600 mt-1">Scheduled: {formatDate(date)}</div>}
            </div>
          </div>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-green-600">{price}</span>
            <button
              onClick={() => setOpen(true)}
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-2xl mx-4">
            <div className="bg-white rounded shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-bold">Book "{title}"</h4>
                <button onClick={() => setOpen(false)} className="text-gray-600 hover:text-gray-800">Close</button>
              </div>
              <BookingForm
                initial={{ tour: _id || slug, tourName: title, date: date }}
                onBooked={() => setOpen(false)}
              />
              <div className="mt-3 text-right">
                <Link to={link || `/tours/${slug || _id}`} className="text-sm text-green-600 hover:underline">View details</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TourCard

