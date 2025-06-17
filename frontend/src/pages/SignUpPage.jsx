import React from "react";
import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const {
    mutate: signUpMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: signup,
    onSuccess: (data) =>
      queryClient.invalidateQueries({
        queryKey: ["authUser"],
      }),
  });

  const handleSignup = (e) => {
    e.preventDefault();
    signUpMutation(signupData);
  };

  return (
    <div
      className="h-screen flex items-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Signup form - left side */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary-9" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>

          {/* ERROR MESSAGE IF ANY  */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response?.data?.message}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Create an Account</h2>
                <p className="text-small opacity-70">
                  Join Streamify and start your language journey today!
                </p>
              </div>
              <div className="space-y-3">
                <div className="form-control w-full"></div>
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input input-bordered w-full"
                  value={signupData.fullName}
                  onChange={(e) =>
                    setSignupData({ ...signupData, fullName: e.target.value })
                  }
                  required
                />
                <div className="form-control w-full"></div>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="john.doe@example.com"
                  className="input input-bordered w-full"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                  required
                />
                <div className="form-control w-full"></div>
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full"
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                  required
                />
                <p className="text-xs opacity-70 mt-1">
                  Password must be at least 6 characters long.
                </p>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                  <input type="checkbox" />
                  <span className="text-xs leading-tight">
                    I agree to the {""}
                  </span>
                  <span className="text-primary hover: underline">
                    terms of service
                  </span>{" "}
                  and{" "}
                  <span className="text-primary hover: underline">
                    privacy policy.
                  </span>
                </label>
              </div>
              <button className="btn btn-primary w-full" type="submit">
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Loading...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
              <div className="text-center mt-4">
                <p className="text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        {/* SIGN UP FORM - RIGHT SIDE */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/I.png"
                alt="Language connection illustration"
                className="w-full h-full"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Connect with language partners worldwide
              </h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
