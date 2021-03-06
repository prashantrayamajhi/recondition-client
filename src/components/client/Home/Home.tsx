import Navbar from '../navbar/HomeNav'
import Welcome from '../Welcome/Welcome'
import About from '../About/About'
import Banner from '../Banner/Banner'
import Services from '../Services/Services'
import Counter from '../Counter/Counter'
import Testimonials from '../Testimonials/Testimonials'
import LatestProduct from '../LatestProducts/LatestProducts'
import Contact from '../Contact/Contact'
import Links from '../Links/Links'
import Footer from '../Footer/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Links />
      <Welcome />
      <LatestProduct />
      <About />
      <Banner />
      <Services />
      <Counter />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}
