import { ProtectedRoute } from "../@components";
import { CreateBlog } from "../@pages";
import { baseURIs } from "../config";

const baseURI = baseURIs.blog;

const blogRoutes = [
  {
    path: `${baseURI}/create`,
    element: (
      <ProtectedRoute authSecure permissions={3}>
        <CreateBlog title="Создание поста" />
      </ProtectedRoute>
    ),
  },
  {
    path: `${baseURI}/edit`,
    element: (
      <ProtectedRoute authSecure permissions={3}>
        <CreateBlog title="Изменение поста" />
      </ProtectedRoute>
    ),
  },
  {
    path: `${baseURI}/:id`,
    element: <CreateBlog title="Блог" />,
  },
];

export default blogRoutes;
