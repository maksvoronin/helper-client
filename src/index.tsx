import ReactDOM from "react-dom/client";
import "./style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { dev_mode } from "./config";
import { CommentsCheck, JournalComments } from "./@pages";
import { authStore, AuthStoreContext } from "./@store";
import { adminRoutes, blogRoutes, developerRoutes, mainRoutes } from "./@routers";
import authRoutes from "./@routers/auth";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const router = createBrowserRouter([
  ...mainRoutes,
  ...developerRoutes,
  ...adminRoutes,
  ...authRoutes,
  ...blogRoutes,
  {
    path: "/journals/comments",
    element: <JournalComments title="Журнал замечаний локомотива" />,
  },
  {
    path: "/journal/comments",
    element: <CommentsCheck title="Журнал замечаний локомотива" />,
  },
]);

try {
  if (dev_mode) {
    console.log("Running in dev mode");
  }
} catch (e: any) {
  console.log(e.message);
}

root.render(
  <AuthStoreContext.Provider value={authStore}>
    <RouterProvider router={router} />
  </AuthStoreContext.Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
