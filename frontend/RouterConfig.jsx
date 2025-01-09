import Header from './src/components/Header'
import Carreras from './src/pages/Carreras';
import Footer from "./src/components/Footer";
import Alumnos from "./src/pages/Alumnos";
import Landing from "./src/pages/Landing";

const routes = [
  {
    path: '/',
    component: (
      <>
         <Landing />
         <Footer />
    </>
    ),
  },
  {
    path: '/Carreras',
    component: (
      <>
         <Carreras />
        <Footer />
      </>
    ),
  },
  {
    path: '/Alumnos',
    component: (
      <>
         <Alumnos />
        <Footer />
      </>
    ),
  }
];


export default routes;
