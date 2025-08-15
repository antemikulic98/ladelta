export default function Loading() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center'>
      <div className='text-center space-y-6'>
        {/* Logo/Brand */}
        <div className='space-y-4'>
          <div className='text-6xl animate-bounce'>🎂</div>
          <h1 className='text-3xl font-playfair font-bold text-gray-900'>
            LaDelta
          </h1>
          <p className='text-lg text-gray-600'>Učitava se...</p>
        </div>

        {/* Loading animation */}
        <div className='flex items-center justify-center space-x-2'>
          <div className='w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse'></div>
          <div className='w-3 h-3 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full animate-pulse delay-75'></div>
          <div className='w-3 h-3 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full animate-pulse delay-150'></div>
        </div>

        {/* Loading bar */}
        <div className='w-64 h-2 bg-gray-200 rounded-full overflow-hidden'>
          <div className='h-full bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 rounded-full animate-pulse'></div>
        </div>
      </div>
    </div>
  );
}
