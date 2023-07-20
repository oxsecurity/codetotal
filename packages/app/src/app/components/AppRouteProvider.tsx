import { FC, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
  return <RouterProvider router={router} />;
};
