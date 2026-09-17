// import { layouts } from "../../layout/layouts ";

// const LayoutController = ({ layout, children }) => {
//   const Layout = layouts[layout];

//   return <Layout>{children}</Layout>;
// };

// export default LayoutController;



import { layouts } from "../../layout/layouts ";

const LayoutController = ({ layout, children }) => {
  const Layout = layouts[layout] || layouts.empty;
  return <Layout>{children}</Layout>;
};

export default LayoutController;