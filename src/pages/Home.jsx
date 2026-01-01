import { Link } from "react-router-dom"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Hero from "../components/Hero"
import DestinationCard from "../components/cards/DestinationCard"
import TestimonialCard from "../components/cards/TestimonialCard"
import Skeleton from "../components/ui/Skeleton"
import { fetchDestinations } from '../store/destinationsSlice'
import { fetchTestimonials } from '../store/testimonialsSlice'

const Home = () => {
  const featuredDestinations = [
    {
      title: "Volcanoes National Park",
      description:
        "Home to endangered mountain gorillas and golden monkeys, offering unforgettable trekking experiences.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt2VdUqyKsI_Y1mEySIYhOvum7U0ZIBZWZ6IRCnsjUsqQ51hk_CYEew55FPCUC8pXlkmY&usqp=CAU",
      link: "/destinations",
    },
    {
      title: "Lake Kivu",
      description: "One of Africa's Great Lakes, offering beautiful beaches, boat tours, and water activities.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1sVucKkpSMaLHpGhTTW6JQnp3gwqVvAFVUg&s",
      link: "/destinations",
    },
    {
      title: "Genocide Memorials",
      description: "Important historical sites that honor the victims of the 1994 genocide against the Tutsi.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7tgj2608NyJ-pGFLDVBdRFliamrVOXrlL_Q&s",
      link: "/destinations",
    },
  ]

  // testimonials are loaded dynamically from the store

  return (
    <div>
      <div className="relative">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          src="https://res.cloudinary.com/dzvxnmqnf/video/upload/v1743154330/202503281112_1_tkyef1.mp4"
        >
          <source src="https://res.cloudinary.com/dzvxnmqnf/video/upload/v1743154330/202503281112_1_tkyef1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 left-0 w-full bg-black/50 dark:bg-black/20 -z-10" />
        <Hero />
      </div>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50 reveal">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Experience Rwanda like never before with our expert guides and customized tours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-700 mb-2">Experienced Tour Guides</h3>
              <p className="text-gray-600">
                Our guides are knowledgeable locals who provide authentic insights into Rwandan culture and history.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-700 mb-2">Unforgettable Experiences</h3>
              <p className="text-gray-600">
                We create memorable journeys that showcase the best of Rwanda's natural beauty and cultural heritage.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-700 mb-2">Exceptional Service</h3>
              <p className="text-gray-600">
                We pride ourselves on personalized service, ensuring your comfort and satisfaction throughout your
                journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 reveal">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">Featured Destinations</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Explore the most beautiful and culturally significant places in Rwanda.
            </p>
          </div>

          <FeaturedDestinations />

          <div className="text-center mt-12">
            <Link
              to="/destinations"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition duration-300"
            >
              View All Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50 reveal">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">What People Say</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">Real feedback from recent travelers.</p>
          </div>
          <TestimonialsList />
        </div>
      </section>

    
    </div>
  )
}

export default Home

const FeaturedDestinations = () => {
  const dispatch = useDispatch()
  const items = useSelector(s => s.destinations.items)

  useEffect(() => { dispatch(fetchDestinations()) }, [dispatch])

  const featured = items.slice(0, 3)

  if (featured.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg overflow-hidden shadow-lg">
            <Skeleton className="w-full h-64" />
            <div className="p-6">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-green-700">
      {featured.map((destination) => (
        <DestinationCard
          key={destination._id}
          title={destination.name}
          description={destination.shortDescription || destination.longDescription}
          image={destination.image}
          link={`/destinations/${destination.slug || destination._id}`}
        />
      ))}
    </div>
  )
}

export { FeaturedDestinations }

const TestimonialsList = () => {
  const dispatch = useDispatch()
  const items = useSelector(s => s.testimonials.items)

  useEffect(() => { dispatch(fetchTestimonials()) }, [dispatch])

  const approved = items.filter(t => t.approved)

  if (approved.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Skeleton className="w-12 h-12 rounded-full mr-4" />
              <div>
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {approved.map(t => (
        <TestimonialCard key={t._id} name={t.name} country={t.country} testimonial={t.testimonial} image={t.image} />
      ))}
    </div>
  )
}