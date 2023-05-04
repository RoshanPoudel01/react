import { createBrowserRouter } from "react-router-dom";
import Nav from "../views/Nav";
import Detailspage from "../views/HotelDetails/index"
import App from "../App";
import Login from "../views/auth/Login"
import Signup from "../views/auth/Signup"
import Admin from "../views/auth/Admin"
import Booking from "../views/Booking/Booking_form";




export const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,

    },
    {
        path: "/details",
        element: <Detailspage/>,
        
      },
      {
        path:"/login",
        element:<Login/>
      },{
        path:"/signup",
        element:<Signup/>
  }
  ,
  {
        path:"/admin",
        element: <Admin />,
     
      },
  {
        path:"/booking",
        element: <Booking />,
     
      }
  ]);