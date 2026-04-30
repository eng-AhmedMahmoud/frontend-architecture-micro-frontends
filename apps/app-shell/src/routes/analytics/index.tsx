import { lazy, Suspense } from "react";
import { LoadingState } from "@commerceos/shared/feedback/loading-state";

const AnalyticsScreen = lazy(() =>
  import("analytics/AnalyticsScreen").then((module) => ({
    default: module.AnalyticsScreen,
  })),
);

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<LoadingState label="Loading analytics..." />}>
      <AnalyticsScreen />
    </Suspense>
  );
}
