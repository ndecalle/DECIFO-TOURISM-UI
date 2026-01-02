import { Link } from "react-router-dom"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import { useTranslation } from "../utils/i18n"

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer data-reveal className="reveal bg-green-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t("general.appName")}</h3>
            <p className="mb-4">{t("footer.companyInfo")}</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-400">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-yellow-400">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-yellow-400">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-yellow-400">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-yellow-400">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-yellow-400">
                  {t("nav.destinations")}
                </Link>
              </li>
              <li>
                <Link to="/tours" className="hover:text-yellow-400">
                  {t("nav.tours")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-yellow-400">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t("footer.popularDestinations")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/destinations" className="hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300">
                  Volcanoes National Park
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300">
                  Lake Kivu
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300">
                  Genocide Memorials
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-yellow-400">
                  Hot Springs
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-yellow-400">
                  Nyungwe Forest
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t("footer.contactUs")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span>{t("contact.info.location.value")}</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0" />
                <span>{t("contact.info.phone.value")}</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0" />
                <span>{t("contact.info.email.value")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 text-center">
          <p>{t("footer.copyright", { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

