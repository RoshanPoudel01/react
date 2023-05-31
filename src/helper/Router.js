import { createBrowserRouter } from "react-router-dom";
import Nav from "../views/Nav";
import Detailspage from "../views/HotelDetails/index";
import App from "../App";
import Login from "../views/auth/Login";
import Signup from "../views/auth/Signup";
import Admin from "../views/admin/Admin";
import ChangePassword from "../views/auth/ChangePassword";
import Booking from "../views/Booking/Booking_form";
import Profile from "../views/auth/Profile";
import Success from "../views/Booking/Success";
import { ClientDashboard } from "../views/client/ClientDashboard";
import SidebarWithHeader from "../layout";
import RequireAuth from "../layout/RequireAuth";
import AddHotel from "../views/client/AddHotel";
import {BookingList} from "../views/client/BookingList";
import {BookingHistory} from "../views/user/bookinghistory";
import {GetPaymentLog} from "../views/user/payments";
import {UpcomingBookings} from "../views/user/UpcomingBookings";
import { HotelList } from "../views/client/HotelList";
import { EditHotel } from "../views/client/EditHotel";
import NormalUserNav from "../layout/normalUserHeader";
import AdminSidebar from "../layout/admin";
import AuthNav from "../layout/authpage";
import MainComponent from "../views/MainComponent";
import { NavURL } from "./Navlink";
import {AllBookings} from "../views/admin/AllBookings"
import {AllUsers} from "../views/admin/AllUsers"
import {AllHotels} from "../views/admin/AllHotels"
import {AllPayments} from "../views/admin/AllPayments"
import BecomeClient from "../views/user/BecomeClient";
import {Callback} from "../views/stripe/callback";

export const router = createBrowserRouter([
  {
    path: NavURL?.Dashboard,
    element: (
   
      <NormalUserNav>
                 <MainComponent/>
</NormalUserNav>
        ),
  },
  {
    
    path: NavURL?.hoteldetails,
    element: ( <RequireAuth role={["Client", "Normal User"]}>
      <NormalUserNav><Detailspage /></NormalUserNav> </RequireAuth>),
  },
  {
    path: NavURL?.login,
    element:(<AuthNav> <Login /></AuthNav>),
  },
  {
    path: NavURL?.signup,
    element: (<AuthNav><Signup /></AuthNav>),
  },
  {
    path: NavURL?.admin,
    element: <Admin />,
  },
  {
    path: NavURL?.allbookings,
    element: (<AdminSidebar><AllBookings /></AdminSidebar>),
  },
  {
    path: NavURL?.allpayments,
    element: (<AdminSidebar><AllPayments /></AdminSidebar>),
  },
  {
    path: NavURL?.allusers,
    element: (<AdminSidebar><AllUsers /></AdminSidebar>),
  },{
    path: NavURL?.allhotels,
    element: (<AdminSidebar><AllHotels /></AdminSidebar>),
  },
  {
    path: NavURL?.booking,
    element: <Booking />,
  },
  {
    path:  NavURL?.success,
    element: <Success />,
  },
  {
    path:NavURL?.clientdashboard,
    element: (
      <RequireAuth role={["Client"]}>
        <SidebarWithHeader>
          <ClientDashboard />
        </SidebarWithHeader>
      </RequireAuth>
    ),
  },{
    path:NavURL?.edithotel,
    element: (
      <RequireAuth role={["Client"]}>
        <SidebarWithHeader>
          <EditHotel />
        </SidebarWithHeader>
      </RequireAuth>
    ),
  },
{
    path: NavURL?.AddHotel,
    element: (
      <RequireAuth role={["Client"]}>
        <SidebarWithHeader>
          <AddHotel />
        </SidebarWithHeader>
      </RequireAuth>
    ),
  },
  {
    path: NavURL?.hotellist,
    element: (
      <RequireAuth role={["Client"]}>
        <SidebarWithHeader>
      <HotelList/>
        </SidebarWithHeader>
      </RequireAuth>
    ),
  },
  {
    path: NavURL?.seeownedhotelbookings,
    element: (
      <RequireAuth role={["Client"]}>
        <SidebarWithHeader>
          <BookingList />
        </SidebarWithHeader>
      </RequireAuth>
    ),
  },
  
  {
    path: NavURL?.profile,
    element: (
      <RequireAuth role={["Client", "Normal User"]}>
         <NormalUserNav>
          <Profile />
          </NormalUserNav>
      </RequireAuth>
    )
  },
 {
    path: NavURL?.BecomeClient,
    element: (
      <RequireAuth role={[ "Normal User"]}>
         <NormalUserNav>
          <BecomeClient />
          </NormalUserNav>
      </RequireAuth>
    )
  },{
    path: NavURL?.spinner,
    element: (
      <RequireAuth role={[ "Normal User"]}>
         <NormalUserNav>
          <Callback />
          </NormalUserNav>
      </RequireAuth>
    )
  },
 
  {
    path: NavURL?.changepassword,
    element: (
      <RequireAuth role={["Client", "Normal User", "Admin"]}>
        <NormalUserNav>
        <ChangePassword />
        </NormalUserNav>
      </RequireAuth>
    )
  },
  {
    
    path: NavURL?.bookinghistory,
    element: ( <RequireAuth role="Normal User">
      <NormalUserNav><BookingHistory /></NormalUserNav> </RequireAuth>),
  },
  {
    
    path: NavURL?.upcomingbookings,
    element: ( <RequireAuth role="Normal User">
      <NormalUserNav><UpcomingBookings /></NormalUserNav>
    </RequireAuth>),
  },
  {
    
    path: NavURL?.paymentlog,
    element: ( <RequireAuth role="Normal User">
      <NormalUserNav><GetPaymentLog /></NormalUserNav> </RequireAuth>),
  },

  
]);
