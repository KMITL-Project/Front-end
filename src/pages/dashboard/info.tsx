import MainLayout from "@/layout/MainLayout";
import { ReactElement } from "react";

const Info = () => {
  return <div className="mt-5 ml-5">INFO</div>;
};

Info.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default Info;
