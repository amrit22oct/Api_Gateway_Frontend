// import { Routes, Route, Navigate } from "react-router-dom";

// import { routes } from "./index.jsx";
// import RouteController from "./RouteController";
// import LayoutController from "./LayoutController.jsx";

// const AppNavigator = () => {
//   return (
//     <Routes>
//       {routes.map((route) => {
//         const Component = route.component;

//         return (
//           <Route
//             key={route.id}
//             path={route.path}
//             element={
//               <RouteController auth={route.auth}>
//                 <LayoutController layout={route.layout}>
//                   <Component />
//                 </LayoutController>
//               </RouteController>
//             }
//           />
//         );
//       })}

//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// };

// export default AppNavigator;

import { Routes, Route } from "react-router-dom";

import { routes } from "./index";
import LayoutController from "./LayoutController";

const AppNavigator = () => {
  return (
    <Routes>
      {routes.map((route) => {
        const Component = route.component;

        return (
          <Route
            key={route.id}
            path={route.path}
            element={
              <LayoutController layout={route.layout}>
                <Component />
              </LayoutController>
            }
          />
        );
      })}
    </Routes>
  );
};

export default AppNavigator;