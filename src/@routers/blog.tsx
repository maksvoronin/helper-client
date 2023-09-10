import { ProtectedRoute } from "../@components";
import { CreateBlog, EditBlog, PostBlog } from "../@pages";
import { baseURIs } from "../config";

const baseURI = baseURIs.blog;

const blogRoutes = [
  {
    path: `${baseURI}`,
    element: <CreateBlog title="Блог" />,
  },
  {
    path: `${baseURI}/create`,
    element: (
      <ProtectedRoute authSecure permissions={3}>
        <CreateBlog title="Создание поста" />
      </ProtectedRoute>
    ),
  },
  {
    path: `${baseURI}/:id`,
    element: <PostBlog />
  },
  {
    path: `${baseURI}/:id/edit`,
    element: (
      <ProtectedRoute authSecure permissions={3}>
        <EditBlog title="Изменение поста" />
      </ProtectedRoute>
    ),
  },
  {
    path: `${baseURI}/:id`,
    element: <CreateBlog title="Блог" />,
  },
];

export default blogRoutes;
