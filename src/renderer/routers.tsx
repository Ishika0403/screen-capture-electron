import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import ScreenCapture from './screenCapture';
import WorkDiary from './WorkDiary';

export default function createRoutes() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Stopwatch />} /> */}
          <Route path="/" element={<ScreenCapture />} />
          <Route path="/work-diary" element={<WorkDiary />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
