import { FC, Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Loader } from "../../common/Loader";
import { ErrorPage } from "./ErrorPage";

const LazyAnalysisPage = lazy(
  () => import("../../analysis/components/AnalysisPage")
);
const LazyReportPage = lazy(() => import("../../report/components/ReportPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <LazyAnalysisPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/report/:requestId",
    element: <LazyReportPage />,
  },
]);

export const AppRouteProvider: FC = () => {
  return (
    <Suspense fallback={<Loader text="Loading page resources" />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
