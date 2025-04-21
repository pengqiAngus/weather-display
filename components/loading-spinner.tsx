export default function LoadingSpinner() {
  return (
    <div className="text-center text-white">
      <div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
      <p className="text-xl">加载中...</p>
    </div>
  )
} 