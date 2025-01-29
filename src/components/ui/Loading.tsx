export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-50" />
      <span className="text-gray-50">Loading...</span>
    </div>
  );
}
