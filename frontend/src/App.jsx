import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";

// Lazy load pages for better performance
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));
const Completed = lazy(() => import("./pages/Completed"));
const Today = lazy(() => import("./pages/Today"));

/**
 * Loading Fallback Component
 * Shows while pages are being loaded
 */
const LoadingFallback = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 
    flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block">
        <div className="h-12 w-12 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mb-4" />
      </div>
      <p className="text-slate-300 font-medium">Loading...</p>
    </div>
  </div>
);

/**
 * Route Configuration
 * Organized by accessibility level
 */
const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];

const privateRoutes = [
  { path: "/", element: <Dashboard />, label: "Dashboard" },
  { path: "/today", element: <Today />, label: "Today's Tasks" },
  { path: "/completed", element: <Completed />, label: "Completed" },
  { path: "/profile", element: <Profile />, label: "Profile" },
  { path: "/change-password", element: <ChangePassword />, label: "Change Password" },
];

/**
 * Main App Component
 */
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* ==================== PUBLIC ROUTES ==================== */}
            {publicRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}

            {/* ==================== PRIVATE ROUTES ==================== */}
            {privateRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <PrivateRoute>
                    {route.element}
                  </PrivateRoute>
                }
              />
            ))}

            {/* ==================== FALLBACK ROUTE ==================== */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;