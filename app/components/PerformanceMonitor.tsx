'use client';

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only show performance monitor in development
    if (process.env.NODE_ENV === 'development') {
      console.log(
        '🎯 Performance Monitor: r3f-perf temporarily disabled for deployment compatibility'
      );
    }
  }, []);

  // Performance monitoring temporarily disabled for deployment compatibility
  // TODO: Re-enable when r3f-perf supports React 19 and @react-three/fiber 9.3+
  return null;
}
