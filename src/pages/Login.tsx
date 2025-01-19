/* React Hooks
============== */
import { useState } from "react";

/* React Router DOM
=================== */
import { Link } from "react-router-dom";

/* ChadCN Components
==================== */
import { buttonVariants, Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

/* React Icons
============== */
import { TbChevronLeft } from "react-icons/tb";

/* Validation
============= */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidationSchema } from "@/validation/login";

/* Form
======= */
import { useForm } from "react-hook-form";

/* Helpers
========== */
// import { login } from "@/helpers/login";

/* Redux
======== */
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { login } from "@/features/auth/auth-slice";

function Login() {
  const { error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const formSubmit = async (values: z.infer<typeof loginValidationSchema>) => {
    setLoading(true);
    try {
      const response = await dispatch(
        login({ email: values.email, password: values.password })
      );

      console.log(response.payload);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const form = useForm<z.infer<typeof loginValidationSchema>>({
    resolver: zodResolver(loginValidationSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(formSubmit)}
            className="space-y-8 w-full max-w-96"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your email."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              variant={!loading ? "default" : "defaultLoading"}
            >
              {loading ? "Logging you in ..." : "Login"}
            </Button>
            {error && <FormMessage children={error} />}
          </form>
        </Form>
      </section>
    </main>
  );
}

export default Login;
