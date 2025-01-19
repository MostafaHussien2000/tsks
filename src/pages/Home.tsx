/* Assets
========= */
import logo from "../assets/logo.png";

/* React Router DOM
=================== */
import { Link } from "react-router-dom";

/* ChadCN Components
==================== */
import { Button, buttonVariants } from "@/components/ui/button.tsx";

/* Redux
======== */
import { useAppSelector } from "@/app/hooks";

function Home() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  return (
    <main id="home-page">
      <div className="container lg:mx-90% mx-auto">
        <nav className="flex items-center justify-between p-4">
          <div className="flex justify-center items-center gap-4">
            <img src={logo} width={40} alt="application logo" />
            <span className="font-bold text-xl">Tsks</span>
          </div>
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <p>
                  Welcome{" "}
                  <span className="text-primary font-semibold">
                    {user?.name || "Unknown"}
                  </span>
                </p>
                <Link
                  to="/dashboard"
                  className={buttonVariants({ variant: "default" })}
                >
                  Go to Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={buttonVariants({ variant: "ghost" })}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={buttonVariants({ variant: "default" })}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
        <section className="p-4 mt-40 grid grid-cols-2">
          <div>
            <h1 className="text-7xl font-extrabold ">
              Take control of your <span className="text-primary">Tsks</span>
            </h1>
            <p className="mt-5">
              Tsks platform helps you stay on top of your tasks, and manage your
              time efficiently.
            </p>
            <Button className="mt-20">Learn More</Button>
          </div>
          <div></div>
        </section>
      </div>
    </main>
  );
}

export default Home;
