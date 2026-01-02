import { Link } from "react-router-dom"
import { useTranslation } from "../utils/i18n"

const Hero = () => {
  const { t } = useTranslation()

  return (
    <div
      data-reveal
      className="reveal relative h-[80vh] bg-cover bg-center"
      style={{ backgroundImage: "url('/placeholder.svg?height=800&width=1600')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{t("home.hero.title")}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">{t("home.hero.subtitle")}</p>
          <Link
            to="/tours"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
          >
            {t("home.hero.cta")}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero

