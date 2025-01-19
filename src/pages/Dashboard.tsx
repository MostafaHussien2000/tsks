/* React Hooks
============== */
import { useState } from "react";

/* ChadCN Components
==================== */
import { Button, buttonVariants } from "@/components/ui/button";

/* Redux
======== */
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logout } from "@/features/auth/auth-slice";

/* React Router Dom
=================== */
import { Link, Navigate } from "react-router-dom";

/* React Icons
============== */
import { TbChevronLeft } from "react-icons/tb";

function Dashboard() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await dispatch(logout());
    } catch (err) {
      console.error(err);
      setError((err as { message: string }).message);
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <main id="dashboard">
      <section className="container flex flex-col justify-start items-center mx-auto">
        <div className="w-full my-9">
          <Link to="/" className={buttonVariants({ variant: "ghost" })}>
            <TbChevronLeft />
            Back to home page
          </Link>
        </div>
        <h1 className="text-white">Dashboard</h1>
        <h4>
          Welcome,{" "}
          <span className="text-primary font-bold">
            {user?.name || "Unknown"}
          </span>
        </h4>
        <Button
          variant={!loading ? "default" : "defaultLoading"}
          onClick={handleLogout}
        >
          {loading ? "Logging out ..." : "Logout"}
        </Button>
        {error && <p>{error}</p>}
      </section>
    </main>
  );
}

export default Dashboard;
