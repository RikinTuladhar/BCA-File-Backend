"use client";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { signup } from "@/app/actions/auth";

const Page = () => {
  const [state, action] = useFormState(signup, undefined);
  const { pending } = useFormStatus();
  return (
    <div className="grid w-full h-screen place-items-center ">
      <form action={action} className="card ">
        <div className="space-y-5 card-body">
          <h5 className="card-title mb-2.5">Sign In As Admin</h5>
          {state?.errors?.invalid && (
            <p className="font-bold text-red-500">{state?.errors.invalid}</p>
          )}
          <div className="form-control w-52 md:w-96">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="John Doe"
              className="input input-floating peer"
            />
            <label className="input-floating-label">User Name</label>
          </div>
          {state?.errors?.username && (
            <p className="text-red-500">{state?.errors.username}</p>
          )}

          <div className="form-control w-52 md:w-96">
            <input
              id="password"
              name="password"
              type="text"
              placeholder="Password"
              className="input input-floating peer"
            />
            <label className="input-floating-label">Password</label>
          </div>
          {state?.errors?.password && (
            <p className="text-red-500">{state?.errors.password}</p>
          )}
          <div className="card-actions">
            <button disabled={pending} className="btn btn-primary">
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
