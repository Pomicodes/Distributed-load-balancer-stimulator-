'use client';

import { useEffect, useRef, useState } from 'react';

import { MAX_HISTORY } from '@/components/charts';
import { initialDemoServers, stepDemoServers } from '@/lib/chartDemo';
import { totalActiveAcross, totalRequestsAcross } from '@/lib/simulationState';

const TICK_MS = 1000;

/**
 * Live-updating demo metrics for charts (and matching fleet UI) when the API is unavailable
 * or NEXT_PUBLIC_CHART_DEMO=true.
 */
export function useChartDemo(enabled) {
  const [servers, setServers] = useState(() => initialDemoServers());
  const [history, setHistory] = useState(() => []);
  const rrRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      setServers(initialDemoServers());
      setHistory([]);
      rrRef.current = 0;
      return;
    }

    rrRef.current = 0;
    let s = initialDemoServers();
    let h = [
      {
        totalRequests: totalRequestsAcross(s),
        totalActive: totalActiveAcross(s),
      },
    ];

    setServers(s.map((x) => ({ ...x })));
    setHistory([...h]);

    const id = setInterval(() => {
      s = stepDemoServers(s, rrRef);
      const point = {
        totalRequests: totalRequestsAcross(s),
        totalActive: totalActiveAcross(s),
      };
      h = [...h, point].slice(-MAX_HISTORY);
      setServers(s.map((x) => ({ ...x })));
      setHistory([...h]);
    }, TICK_MS);

    return () => clearInterval(id);
  }, [enabled]);

  return { servers, history };
}
