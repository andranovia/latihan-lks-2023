import React from "react";
import Link from "next/link";
import AuthCard from "@/components/auth/AuthCard";
import AuthInput from "@/components/auth/AuthInput";
import AuthLabel from "@/components/auth/AuthLabel";
import { useAuth } from "@/components/hooks/AuthHooks";

function Login() {
  const {
    loginAction,
    validationErrors,
    name,
    setName,
    password,
    setPassword,
    isSubmitting,
  } = useAuth();

  return (
    <div className="pt-20  ">
      <AuthCard>
        <h5 className="text-2xl font-bold text-gray-800 mb-8">Sign in</h5>
        <form
          onSubmit={(e) => {
            loginAction(e);
          }}
        >
          {validationErrors && Object.keys(validationErrors).length !== 0 && (
            <AuthInput messages={validationErrors} className="mt-2" />
          )}

          <div className="mb-3">
            <AuthLabel htmlFor="name" className="form-label">
              Username
            </AuthLabel>
            <AuthInput
              type="name"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={(e: any) => {
                setName(e.target.value);
              }}
            />
          </div>
          {validationErrors && validationErrors.username!= undefined && (
            <AuthInput messages={validationErrors.username} className="mt-2" />
          )}
          <div className="mb-3">
            <AuthLabel htmlFor="password" className="form-label">
              Password
            </AuthLabel>
            <AuthInput
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
            />
            {validationErrors && validationErrors.password != undefined && (
              <AuthInput
                messages={validationErrors.password}
                className="mt-2"
              />
            )}
          </div>
          <div className="d-grid gap-2">
            <button
              className="bg-black px-6 h-10 rounded-md my-4 text-white"
              disabled={isSubmitting}
              type="submit"
            >
              Login
            </button>
            <p className="text-center mt-8">
              Don't have account?{" "}
              <Link className="text-green-500" href="/auth/register">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </AuthCard>
    </div>
  );
}

export default Login;
