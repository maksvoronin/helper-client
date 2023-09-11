import { ProtectedRoute } from "../@components";
import { AllPosts, CreateBlog, EditBlog, PostBlog } from "../@pages";
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
    path: `${baseURI}`,
    element: <AllPosts title="Блог Helper" />
  }
];

export default blogRoutes;
