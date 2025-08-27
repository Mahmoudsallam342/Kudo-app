import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Alert, Card, Label, Radio, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import ValidationError from "../../shared/Validation/ValidationError";
import ButtonApp from "../../shared/buttonApp/ButtonApp";
import { HiInformationCircle } from "react-icons/hi";
const defaultValues = {
  name: "",
  email: "",
  password: "",
  rePassword: "",
  dateOfBirth: "",
  gender: "",
};
const schema = z
  .object({
    name: z
      .string({ message: "name is reqired" })
      .min(3, { message: "at least 3" }),
    email: z.string().email({ message: "invalid email" }),
    password: z
      .string()
      .min(8, { message: "password must contain at least 8 letters" })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message:
          "password must contain at least 1 Uppercase letter,special character,number",
      }),
    rePassword: z.string(),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    gender: z.enum(["male", "female", "none"], {
      message: "please select a gender",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "password do not match",
    path: ["rePassword"],
  });
function Register() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });
  console.log(isValid);

  async function onSubmit(data) {
    try {
      const { data: response } = await axios.post(
        "https://linked-posts.routemisr.com/users/signup",
        data
      );
      if (response.message === "success") {
        setApiError(null);
        navigate("/login");
      } else {
        throw new Error("register failed");
      }
    } catch (error) {
      console.log(error);
      setApiError(error.response.data.error);
    }
  }
  return (
    <section className="py-12 max-w-lg mx-auto">
      <Card>
        <h1 className="text-center logo">Register</h1>
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
            {/* =====================Email====================== */}
            <div className="mb-2 block">
              <Label htmlFor="email">Your email</Label>
            </div>
            <TextInput
              id="email"
              type="text"
              placeholder="Email@Example.com"
              {...register("email")}
            />
            <ValidationError error={errors.email?.message} />
          </div>
          {/* =====================name====================== */}

          <div>
            <div className="mb-2 block">
              <Label htmlFor="name">User-Name</Label>
            </div>
            <TextInput
              id="name"
              type="text"
              placeholder="User-Name"
              {...register("name")}
            />
            <ValidationError error={errors.name?.message} />
          </div>
          {/* =====================password====================== */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password">User-password</Label>
            </div>
            <TextInput
              id="password"
              type="password"
              placeholder="*************"
              {...register("password")}
            />
            <ValidationError error={errors.password?.message} />
          </div>
          {/* =====================repassword====================== */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="rePassword">rePassword</Label>
            </div>
            <TextInput
              id="rePassword"
              type="password"
              placeholder="*************"
              {...register("rePassword")}
            />
            <ValidationError error={errors.rePassword?.message} />
          </div>
          {/* =====================date====================== */}

          <div>
            <div className="mb-2 block">
              <Label htmlFor="dateOfBirth">dateOfBirth</Label>
            </div>
            <TextInput
              id="dateOfBirth"
              type="date"
              {...register("dateOfBirth")}
            />
            <ValidationError error={errors.dateOfBirth?.message} />
          </div>
          {/* =====================gender====================== */}

          <div>
            <div className="mb-2 block">
              <Label htmlFor="gender">gender</Label>
            </div>
            <div className="flex max-w-md flex-col gap-4">
              <div className="flex items-center gap-2">
                <Radio id="male" {...register("gender")} value="male" />
                <Label htmlFor="male">male</Label>
              </div>
            </div>
            <div className="flex max-w-md flex-col gap-4">
              <div className="flex items-center gap-2">
                <Radio id="female" {...register("gender")} value="female" />
                <Label htmlFor="female">female</Label>
              </div>
            </div>
            <div className="flex max-w-md flex-col gap-4">
              <div className="flex items-center gap-2">
                <Radio id="none" {...register("gender")} value="none" />
                <Label htmlFor="none">none</Label>
              </div>
            </div>
            <ValidationError error={errors.gender?.message} />
          </div>
          <ButtonApp
            color="purple"
            disabled={!isValid}
            isLoading={isSubmitting}
          >
            Register
          </ButtonApp>
        </form>
      </Card>
    </section>
  );
}

export default Register;
