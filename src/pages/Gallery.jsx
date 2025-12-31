"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { fetchImages } from '../store/imagesSlice'

const Gallery = () => {
  // Categories for filtering
  const categories = ["All", "Wildlife", "Landscapes", "Culture", "Activities"]

  // State for active category
  const [activeCategory, setActiveCategory] = useState("All")

  const dispatch = useDispatch()
  const images = useSelector(s => s.images.items)

  useEffect(() => { dispatch(fetchImages()) }, [dispatch])

  // Normalize items from backend: expected objects with url and maybe tags/categories
  const normalized = images.map((img, i) => ({ id: img._id || i, src: img.url || img.secure_url || img.url, alt: img.title || img.description || 'Image', category: (img.tags && img.tags[0]) || 'All', caption: img.title || img.description || '' }))

  // Filter images based on active category
  const filteredImages = activeCategory === "All" ? normalized : normalized.filter((image) => image.category === activeCategory)

  // State for lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(null)

  // Open lightbox with selected image
  const openLightbox = (image) => {
    setCurrentImage(image)
    setLightboxOpen(true)
    document.body.style.overflow = "hidden" // Prevent scrolling when lightbox is open
  }

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = "auto" // Restore scrolling
  }

  // Navigate to next image in lightbox
  const nextImage = () => {
    const currentIndex = filteredImages.findIndex((img) => img.id === currentImage.id)
    const nextIndex = (currentIndex + 1) % filteredImages.length
    setCurrentImage(filteredImages[nextIndex])
  }

  // Navigate to previous image in lightbox
  const prevImage = () => {
    const currentIndex = filteredImages.findIndex((img) => img.id === currentImage.id)
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length
    setCurrentImage(filteredImages[prevIndex])
  }

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[40vh] bg-cover bg-center"
        style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTivZN0a_MCnHnpBLRl7JvT1aqfENEmhN2s9A&s')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
            <p className="text-xl max-w-3xl mx-auto">Explore Rwanda through our collection of stunning images</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full transition duration-300 ${
                  activeCategory === category
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="overflow-hidden rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300"
                onClick={() => openLightbox(image)}
              >
                <div className="relative group">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm font-medium">{image.caption}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && currentImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            aria-label="Close lightbox"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            aria-label="Previous image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            aria-label="Next image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="max-w-4xl max-h-[80vh] relative">
            <img
              src={currentImage.src || "/placeholder.svg"}
              alt={currentImage.alt}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
              <p className="text-lg">{currentImage.caption}</p>
              <p className="text-sm text-gray-300">{currentImage.category}</p>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience Rwanda in Person</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            Photos can only capture a fraction of Rwanda's beauty. Join us for an unforgettable journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/tours"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full text-lg transition duration-300"
            >
              Browse Tours
            </a>
            <a
              href="/contact"
              className="bg-transparent hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg border-2 border-white transition duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Gallery

