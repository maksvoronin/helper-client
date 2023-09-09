import { observer } from "mobx-react";
import { PageProps } from "../../@types";
import { FC } from "react";
import { BlogLayout } from "../../@layouts";

const CreateBlog: FC<PageProps> = observer(({ title }) => {
  return <BlogLayout title={title}></BlogLayout>;
});

export default CreateBlog;
