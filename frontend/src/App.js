import "./App.css";
import Layout from "./components/Layout/Layout";
import Students from "./pages/Students";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddStudent from "./pages/Students/AddStudent";
import Courses from "./pages/Courses";
import AddCourse from "./pages/Courses/AddCourse";
import Results from "./pages/Results";
import AddResult from "./pages/Results/AddResult";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Results />,
        },
        {
          path: "/students",
          element: <Students />,
        },
        {
          path: "/students/add",
          element: <AddStudent />,
        },

        {
          path: "/courses",
          element: <Courses />,
        },
        {
          path: "/courses/add",
          element: <AddCourse />,
        },

        {
          path: "/results",
          element: <Results />,
        },
        {
          path: "/results/add",
          element: <AddResult />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
