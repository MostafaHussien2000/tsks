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
import { registerAccountValidationSchema } from "@/validation/register";

/* Form
======= */
import { useForm } from "react-hook-form";

/* Helpers
========== */
import { registerUser } from "@/helpers/registerUser";

function Register() {
  const form = useForm<z.infer<typeof registerAccountValidationSchema>>({
    resolver: zodResolver(registerAccountValidationSchema),
    mode: "onBlur",
  });

  const onSubmit = async (
    values: z.infer<typeof registerAccountValidationSchema>
  ) => {
    try {
      const response = await registerUser({
        full_name: values.fullName,
        email: values.email,
        password: values.password,
        avatar_url: "",
      });

      console.log(response);
    } catch (err) {
      console.error(err);
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
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
        </Form>
      </section>
    </main>
  );
}

export default Register;
