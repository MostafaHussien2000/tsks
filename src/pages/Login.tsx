/* React Router DOM
=================== */
import { Link } from "react-router-dom";

/* ChadCN Components
==================== */
import { buttonVariants } from "@/components/ui/button";

/* React Icons
============== */
import { TbChevronLeft } from "react-icons/tb";

function Login() {
  return (
    <main id="login-page">
      <section className="container flex flex-col justify-start items-center mx-auto">
        <div className="w-full my-9">
          <Link to="/" className={buttonVariants({ variant: "ghost" })}>
            <TbChevronLeft />
            Back to home page
          </Link>
        </div>
        <h1 className="text-3xl font-bold">Welcome Back !</h1>
      </section>
    </main>
  );
}

export default Login;
