import axios from "axios";
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Label,
  TextInput,
} from "flowbite-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ButtonApp from "../../shared/buttonApp/ButtonApp";
import ValidationError from "../../shared/Validation/ValidationError";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import { HiInformationCircle } from "react-icons/hi";
export default function Login() {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const schema = z.object({
    email: z.string().email({ message: "Emaill is not valid" }),
    password: z
      .string()
      .min(8, { message: "incorrect password" })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message: "incorrect password",
      }),
  });
  const defaultValues = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues, resolver: zodResolver(schema) });
  async function onSubmit(data) {
    try {
      const { data: response } = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        data
      );
      console.log("response:", response);
      if (response.message === "success") {
        setApiError(null);
        localStorage.setItem("token", response.token);
        setToken(response.token);
        navigate("/posts");
      } else {
        throw new Error("login failed");
      }
    } catch (error) {
      console.log(error);
      setApiError(error.response.data.error);
    }
  }
  return (
    <section className="max-w-lg mx-auto py-12">
      <Card>
        <div className="container  ">
          <h1 className="text-center logo ">Login</h1>
          {apiError && (
            <Alert className="my-4" color="failure" icon={HiInformationCircle}>
              {apiError}
            </Alert>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex max-w-md flex-col gap-4"
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email">Your email</Label>
              </div>
              <TextInput
                id="email"
                type="text"
                placeholder="Email@Example.com"
                {...register("email", { required: "Email is required" })}
              />
              <ValidationError error={errors.email?.message} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password">Your password</Label>
              </div>
              <TextInput
                id="password"
                type="text"
                placeholder="*********"
                {...register("password", { required: "password is required" })}
              />
              <ValidationError error={errors.password?.message} />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <ButtonApp color="purple" isLoading={isSubmitting}>
              Login
            </ButtonApp>
          </form>
        </div>
      </Card>
    </section>
  );
}
