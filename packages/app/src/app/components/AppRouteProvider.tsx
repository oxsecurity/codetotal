import { FC, Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Loader } from "../../report/components/Loader";
import { ErrorPage } from "./ErrorPage";

const LazyAnalysisPage = lazy(() => import("../../analysis/AnalysisPage"));
const LazyReportPage = lazy(() => import("../../report/ReportPage"));

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
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
