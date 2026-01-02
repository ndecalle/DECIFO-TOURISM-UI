import { useTranslation } from "../utils/i18n";

const About = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.natgeofe.com/n/3646f25d-9d46-4a1f-8190-592bccdc3cda/0000016a-2bf7-de00-a1fb-eff78afa0000.jpg?wp=1&w=1884.75&h=1060.5')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("about.hero.title")}</h1>
            <p className="text-xl max-w-3xl mx-auto">{t("about.hero.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-green-700 mb-6">{t("about.story.title")}</h2>
              <p className="text-gray-700 mb-4">{t("about.story.content1")}</p>
              <p className="text-gray-700 mb-4">{t("about.story.content2")}</p>
              <p className="text-gray-700">{t("about.story.content3")}</p>
            </div>
            <div className="order-first lg:order-last">
              <img
                src="https://res.cloudinary.com/dzvxnmqnf/image/upload/v1743677395/PHOTO-2025-03-28-13-10-32_x0efmy.jpg"
                alt={t("about.team.title")}
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-700 mb-4">{t("about.values.title")}</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">{t("about.values.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-700 mb-2">{t("about.values.community.title")}</h3>
              <p className="text-gray-600">{t("about.values.community.description")}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
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
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-700 mb-2">{t("about.values.sustainability.title")}</h3>
              <p className="text-gray-600">{t("about.values.sustainability.description")}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-700 mb-2">{t("about.values.authenticity.title")}</h3>
              <p className="text-gray-600">{t("about.values.authenticity.description")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-700 mb-4">{t("about.team.title")}</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">{t("about.team.subtitle")}</p>
          </div>

          <div className="flex flex-col items-center gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md max-w-sm">
              <img
                src="https://res.cloudinary.com/dzvxnmqnf/image/upload/v1743677395/PHOTO-2025-03-28-13-10-32_x0efmy.jpg"
                alt={t("about.team.title")}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-green-700 mb-1">Decalle Ntihinduka</h3>
                <p className="text-gray-500 mb-3">{t("about.team.subtitle")}</p>
                <p className="text-gray-600">
                  {t("about.team.subtitle")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("about.cta.title")}</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">{t("about.cta.subtitle")}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/tours"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full text-lg transition duration-300"
            >
              {t("about.cta.viewTours")}
            </a>
            <a
              href="/contact"
              className="bg-transparent hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg border-2 border-white transition duration-300"
            >
              {t("about.cta.contactUs")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

