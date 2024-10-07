import {
  createBrowserRouter
} from "react-router-dom";
import App from "../App";
import DashboardLayoutM from "../medecin/DashbordLayoutM";
import DashboardM from "../medecin/DashbordM";
import DashboardLayoutS from "../secretaire/DashbordLayoutS";
import DashboardS from "../secretaire/DashbordS"
import AjoutPatient from "../secretaire/AjoutPatient";
import ListePatients from "../secretaire/ListePatients";
import ModifierPatient from "../secretaire/ModifierPatient";
import PrendRV from "../secretaire/PrendRV";
import ListeRV from "../secretaire/ListeRV";
import ListePatientsM from "../medecin/ListePatients"
import Ordonnances from "../medecin/Ordonnances";
import DossierMedical from "../medecin/DossierMedical";




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/medecin/dashboard",
    element: <DashboardLayoutM />,
    children: [
      {
        path: '/medecin/dashboard',
        element: <DashboardM />
      },
      {
        path:'/medecin/dashboard/liste-patients',
        element:<ListePatientsM/>
      },
      {
        path:'/medecin/dashboard/ordonnance/:id',
        element:<Ordonnances/>,
        loader: ({ params }) => fetch(`http://localhost:1500/api/ordonnance/${params.id}`)
      },
      {
        path:'/medecin/dashboard/dossier_medical/:id',
        element:<DossierMedical/>,
        loader: ({ params }) => fetch(`http://localhost:1500/api/dossier_medical/${params.id}`)
      },
    ]
    },
    {
      path: "/secretaire/dashboard",
      element: <DashboardLayoutS />,
      children: [
        {
          path: '/secretaire/dashboard',
          element: <DashboardS />
        },
        {
          path:'/secretaire/dashboard/ajouter-patient',
          element:<AjoutPatient/>
        },
        {
          path:'/secretaire/dashboard/liste-patients',
          element:<ListePatients/>
        },
        {
          path: '/secretaire/dashboard/modifierInfoPatient/:id',
          element: <ModifierPatient />,
          loader: ({ params }) => fetch(`http://localhost:1500/api/patient/${params.id}`)
        },
        {
          path: '/secretaire/dashboard/prend-RV/:id',
          element: <PrendRV />, 

        },
        {
          path: '/secretaire/dashboard/liste-RV',
          element: <ListeRV />
        },

      ]
      }
  
  

]);
export default router;