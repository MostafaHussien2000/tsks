import { ReactNode } from "react";

/* React Router DOM
=================== */
import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  allowed,
}: {
  children: ReactNode;
  allowed: boolean;
}) {
  // Only authenticated users will be allowed to pass.
  if (!allowed) return <Navigate to="/login" />;

  return children;
}

export default ProtectedRoute;
