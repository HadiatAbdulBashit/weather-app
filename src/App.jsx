import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Root from "./Containers/Root";
import Home from "./Containers/Home";
import PinnedLocation from "./Containers/PinnedLocation";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="pin" element={<PinnedLocation />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
