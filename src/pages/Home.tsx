/* Assets
========= */
import logo from "../assets/logo.png";

/* React Router DOM
=================== */
import { Link } from "react-router-dom";

/* ChadCN Components
==================== */
import { Button, buttonVariants } from "@/components/ui/button.tsx";

function Home() {
  return (
    <main id="home-page">
      <div className="container lg:mx-90% mx-auto">
        <nav className="flex items-center justify-between p-4">
          <div className="flex justify-center items-center gap-4">
            <img src={logo} width={40} alt="application logo" />
            <span className="font-bold text-xl">Tsks</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/login" className={buttonVariants({ variant: "ghost" })}>
              {/* <Button variant={"ghost"}>Login</Button> */}
              Login
            </Link>
            <Link
              to="/register"
              className={buttonVariants({ variant: "default" })}
            >
              {/* <Button>Register</Button> */}
              Register
            </Link>
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
