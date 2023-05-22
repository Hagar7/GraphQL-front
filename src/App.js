import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";



function App() {

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
