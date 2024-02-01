import React from "react";
import AuthCard from "@/components/auth/AuthCard";
import Link from "next/link";
import AuthLabel from "@/components/auth/AuthLabel";
import AuthInput from "@/components/auth/AuthInput";
import AuthError from "@/components/auth/AuthError";
import { useAuth } from "@/components/hooks/AuthHooks";

function Register() {
  const {
    registerAction,
    name,
    setName,
    validationErrors,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isSubmitting,
  } = useAuth();

  return (
    <div>
      <AuthCard>
        <h5 className="text-2xl font-bold text-gray-800 mb-8">Register</h5>

        <form onSubmit={(e) => registerAction(e)}>
          <div className="mb-3">
            <AuthLabel htmlFor="name" className="form-label">
              Name
            </AuthLabel>
            <AuthInput
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={(e: any) => {
                setName(e.target.value);
              }}
            />
            {validationErrors && validationErrors.username != undefined && (
              <AuthError messages={validationErrors.username} className="mt-2" />
            )}
          </div>
        
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
              onChange={(e: any) => setPassword(e.target.value)}
            />
            {validationErrors && validationErrors.password != undefined && (
              <AuthError
                messages={validationErrors.password}
                className="mt-2"
              />
            )}
          </div>
          <div className="mb-3">
            <AuthLabel htmlFor="confirm_password" className="form-label">
              Confirm Password
            </AuthLabel>
            <AuthInput
              type="password"
              className="form-control"
              id="confirm_password"
              name="confirm_password"
              value={confirmPassword}
              onChange={(e: any) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2">
            <button
              className="bg-black px-6 h-10 rounded-md my-4 text-white"
              disabled={isSubmitting}
              type="submit"
            >
              Register Now
            </button>
            <p className="text-center mt-8">
              Have already an account ?{" "}
              <Link className="text-green-500" href="/auth/login">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </AuthCard>
    </div>
  );
}

export default Register;
