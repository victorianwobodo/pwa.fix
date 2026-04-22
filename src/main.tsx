import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@/index.css'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { HomePage } from '@/pages/HomePage'
import { CheckInPage } from '@/pages/CheckInPage'
import { FramesPage } from '@/pages/FramesPage'
import { CommitmentsPage } from '@/pages/CommitmentsPage'
import { LedgerPage } from '@/pages/LedgerPage'
import { InsightsPage } from '@/pages/InsightsPage'
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary'
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <MobileLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "check-in", element: <CheckInPage /> },
      { path: "frames", element: <FramesPage /> },
      { path: "commitments", element: <CommitmentsPage /> },
      { path: "ledger", element: <LedgerPage /> },
      { path: "insights", element: <InsightsPage /> },
    ]
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)