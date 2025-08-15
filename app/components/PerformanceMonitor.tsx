'use client';

import { Perf } from 'r3f-perf';
import { useEffect, useState } from 'react';

export default function PerformanceMonitor() {
  const [showPerf, setShowPerf] = useState(false);

  useEffect(() => {
    // Only show performance monitor in development
    if (process.env.NODE_ENV === 'development') {
      setShowPerf(true);
    }
  }, []);

  if (!showPerf) return null;

  return <Perf position='top-left' />;
}
