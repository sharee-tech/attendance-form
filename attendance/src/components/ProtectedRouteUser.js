// import { useEffect } from "react";
// import {
//   Route,
//   Redirect,
//   Navigate,
//   Outlet,
//   useNavigate,
//   useLocation,
// } from "react-router-dom";
// import jwtDecode from "jwt-decode";

// const ProtectedRouteUser = (props) => {
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   function presentPage() {
//     navigate(-1);
//   }

//   if (!token) return <Navigate to="/" />;

//   useEffect(() => {
//     if (token && jwtDecode(token).role !== "user") {
//       presentPage();
//     }
//   }, [token && jwtDecode(token).role !== "user"]);

//   const decodedData = jwtDecode(token);

//   if (decodedData.role === "user") {
//     return <Outlet {...props} />;
//   } else if (decodedData.role !== "admin") {
//     presentPage();
//   }
// };

// export default ProtectedRouteUser;
