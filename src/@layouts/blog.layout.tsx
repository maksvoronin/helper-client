import { observer } from "mobx-react";
import { FC } from "react";
import { PageProps } from "../@types";

const BlogLayout: FC<PageProps> = observer(({ title }) => {
  return (
    <>
      <title>{title}</title>
    </>
  );
});

export default BlogLayout;
