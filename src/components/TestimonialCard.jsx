import ImageWithSkeleton from "./ImageWithSkeleton"

const TestimonialCard = ({ name, country, testimonial, image }) => {
  return (
    <div data-reveal className="reveal bg-white rounded-lg p-6 shadow-lg">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 mr-4">
          <ImageWithSkeleton src={image || "/placeholder.svg"} alt={name} className="w-16 h-16 rounded-full object-cover" />
        </div>
        <div>
          <h4 className="font-bold text-lg">{name}</h4>
          <p className="text-gray-600">{country}</p>
        </div>
      </div>
      <p className="text-gray-700 italic">"{testimonial}"</p>
    </div>
  )
}

export default TestimonialCard

