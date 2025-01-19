/* React Hooks
============== */
import { useState } from "react";

/* React Router DOM
=================== */
import { Link, Navigate, useNavigate } from "react-router-dom";

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
import { registerAccountValidationSchema } from "@/validation/register";

/* Form
======= */
import { useForm } from "react-hook-form";

/* Helpers
========== */
import { register } from "@/helpers/register";

/* Redux
======== */
import { useAppSelector } from "@/app/hooks";

function Register() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerAccountValidationSchema>>({
    resolver: zodResolver(registerAccountValidationSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof registerAccountValidationSchema>
  ) => {
    setLoading(true);
    try {
      await register({
        full_name: values.fullName,
        email: values.email,
        password: values.password,
        avatar_url: "",
      });

      navigate("/login");
    } catch (err) {
      setError((err as { message: string })?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="register-page">
      <section className="container flex flex-col justify-start items-center mx-auto">
        <div className="w-full my-9">
          <Link to="/" className={buttonVariants({ variant: "ghost" })}>
            <TbChevronLeft />
            Back to home page
          </Link>
        </div>
        <h1 className="text-3xl font-bold">
          Welcome to <span className="text-primary">Tsks</span>
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full max-w-96"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your full name."
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Retype your password."
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
              {loading ? "Registering your account ..." : "Create Account"}
            </Button>
            {error && <FormMessage children={error} />}
          </form>
        </Form>
      </section>
    </main>
  );
}

export default Register;
