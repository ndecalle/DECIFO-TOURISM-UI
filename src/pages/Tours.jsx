import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useTranslation } from "../utils/i18n";
import TourCard from "../components/cards/TourCard";
import Skeleton from "../components/ui/Skeleton";
import { fetchTours } from '../store/toursSlice'

const Tours = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch()
  const tours = useSelector(s => s.tours.items)

  useEffect(() => { dispatch(fetchTours()) }, [dispatch])

  const customTours = [
    {
      title: t("tours.customTours.family.title"),
      description: t("tours.customTours.family.description"),
      image: "https://www.africangorilla.com/wp-content/uploads/2024/11/Rwanda-Student-Safaris-Educational-Tours-Study-Trips-e1732583025171-1024x421.jpg",
    },
    {
      title: t("tours.customTours.honeymoon.title"),
      description: t("tours.customTours.honeymoon.description"),
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEQvFHFIQEn1j6iaDQlCdb4snaw1DjmzGxQ&s",
    },
    {
      title: t("tours.customTours.photography.title"),
      description: t("tours.customTours.photography.description"),
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrmEkzqOTFAd-TC7mivg5LjUVgWFxsCNIoCg&s",
    },
    {
      title: t("tours.customTours.birdwatching.title"),
      description: t("tours.customTours.birdwatching.description"),
      image: "https://www.africabirdingexpeditions.com/themes/user/site/africabirdingexped/assets/img/tours/_og/Papyrus-Golonek__MS-QENP-_L.MNP_.jpg",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: "url('https://www.explorerwandatours.com/wp-content/uploads/2019/11/Canopy-Walkway-Nyungwe.gif')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("tours.hero.title")}</h1>
            <p className="text-xl max-w-3xl mx-auto">{t("tours.hero.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-16 reveal">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-700 mb-4">{t("tours.featuredTours.title")}</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">{t("tours.featuredTours.subtitle")}</p>
          </div>

          {tours.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <Skeleton className="w-full h-64" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour) => (
                <TourCard
                  key={tour._id}
                  _id={tour._id}
                  slug={tour.slug}
                  title={tour.title}
                  description={tour.description}
                  duration={tour.duration}
                  price={tour.priceText || tour.price}
                  image={tour.image}
                  link={`/tours/${tour.slug || tour._id}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Custom Tours */}
      <section className="py-16 bg-gray-50 reveal">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-700 mb-4">{t("tours.customTours.title")}</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">{t("tours.customTours.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {customTours.map((tour, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row">
                <img
                  src={tour.image || "/placeholder.svg"}
                  alt={tour.title}
                  className="w-full md:w-1/3 h-64 md:h-auto object-cover"
                />
                <div className="p-6 md:w-2/3">
                  <h3 className="text-xl font-bold text-green-700 mb-2">{tour.title}</h3>
                  <p className="text-gray-600 mb-4">{tour.description}</p>
                  <a
                    href="/contact"
                    className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
                  >
                    {t("tours.customTours.inquireNow")}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-green-700 mb-4 text-center">{t("tours.customTours.designYourOwn.title")}</h3>
            <p className="text-gray-600 mb-6 text-center">{t("tours.customTours.designYourOwn.description")}</p>
            <div className="text-center">
              <a
                href="/contact"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
              >
                {t("tours.customTours.designYourOwn.cta")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Information */}
      <section className="py-16 reveal">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-green-700 mb-6">{t("tours.included.title")}</h2>
              <ul className="space-y-3">
                {t("tours.included.items", { returnObjects: true }).map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-6 w-6 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-green-700 mb-6">{t("tours.notIncluded.title")}</h2>
              <ul className="space-y-3">
                {t("tours.notIncluded.items", { returnObjects: true }).map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-6 w-6 text-red-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-700 text-white reveal">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("tours.cta.title")}</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">{t("tours.cta.subtitle")}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/contact"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
            >
              {t("tours.cta.bookNow")}
            </a>
            <a
              href="/contact"
              className="bg-transparent hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg border-2 border-white transition duration-300"
            >
              {t("tours.cta.requestCustom")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tours;

