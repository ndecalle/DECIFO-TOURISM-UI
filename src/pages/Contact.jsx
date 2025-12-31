import ContactForm from "../components/ContactForm"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

const Contact = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[40vh] bg-cover bg-center"
        style={{ backgroundImage: "url('https://universalventuresrwanda.com/wp-content/uploads/2022/10/shutterstock_1035464182-min-scaled-1024x683-2-768x480.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl max-w-3xl mx-auto">Get in touch to plan your Rwanda adventure</p>
          </div>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-green-700 mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions about our tours or need help planning your trip to Rwanda? Our team is here to assist
                you. Fill out the form or contact us directly using the information below.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Our Location</h3>
                    <p className="text-gray-600">Kigali, Rwanda</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone Number</h3>
                    <p className="text-gray-600">+250 780 258 219</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email Address</h3>
                    <p className="text-gray-600">info@ngwinourebe.rw</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 9:00 AM - 4:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-bold text-lg mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-green-600 p-3 rounded-full hover:bg-green-700 transition duration-300">
                    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-green-600 p-3 rounded-full hover:bg-green-700 transition duration-300">
                    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                      />
                    </svg>
                  </a>
                  <a href="#" className="bg-green-600 p-3 rounded-full hover:bg-green-700 transition duration-300">
                    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-700 mb-4">Our Location</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">Visit our office in Kigali, Rwanda</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            {/* Replace with actual Google Maps embed */}
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Google Maps Embed would go here</p>
              {/* 
                In a real implementation, you would use:
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63799.41051610352!2d30.03955565!3d-1.9440867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca4258ed8e797%3A0xf32b36a5411d0bc8!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1647882610000!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style="border:0;" 
                  allowfullscreen="" 
                  loading="lazy"
                ></iframe>
              */}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-700 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about traveling in Rwanda
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-green-700 mb-2">What is the best time to visit Rwanda?</h3>
                <p className="text-gray-600">
                  Rwanda can be visited year-round. The dry seasons (June to September and December to February) are
                  ideal for gorilla trekking and wildlife viewing. The wet seasons offer lush landscapes and are less
                  crowded.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-green-700 mb-2">Do I need a visa to visit Rwanda?</h3>
                <p className="text-gray-600">
                  Most visitors can obtain a visa on arrival or apply online through the Rwanda Immigration website.
                  Citizens of some countries are exempt from visa requirements. We recommend checking the latest visa
                  information before your trip.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-green-700 mb-2">How much does gorilla trekking cost?</h3>
                <p className="text-gray-600">
                  Gorilla trekking permits cost $1,500 per person for foreign non-residents. This includes park entrance
                  fees and a guided trek. We handle all permit arrangements for our clients.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-green-700 mb-2">Is Rwanda safe for tourists?</h3>
                <p className="text-gray-600">
                  Rwanda is considered one of the safest countries in Africa. It has low crime rates, stable governance,
                  and excellent infrastructure. As with any destination, normal travel precautions should be observed.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-green-700 mb-2">What languages are spoken in Rwanda?</h3>
                <p className="text-gray-600">
                  The official languages are Kinyarwanda, English, French, and Swahili. English is widely spoken in
                  tourist areas, and our guides are fluent in English.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Planning Your Trip?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            Contact us today and let our expert team help you create the perfect Rwanda itinerary.
          </p>
          <a
            href="tel:+250XXXXXXXX"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 inline-flex items-center"
          >
            <Phone className="mr-2 h-5 w-5" />
            Call Us Now
          </a>
        </div>
      </section>
    </div>
  )
}

export default Contact

