export function DashboardIframePage() {
  return (
    <div className="h-full">
      <iframe
        title="Dashboard"
        src="/dashboard/"
        className="h-[calc(100vh-10rem)] w-full rounded-xl border bg-background"
      />
    </div>
  );
}
