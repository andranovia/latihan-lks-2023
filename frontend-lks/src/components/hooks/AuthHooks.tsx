import axiosInstance from "@/tools/axiosIntance";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { getUser } from "@/tools/getAuth";

interface ValidationErrors {
  username?: string[];
  password?: string[];
  general?: any;
}

interface User {
  username: string;

}

export const useAuth = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          const userData: User = await getUser(accessToken);
          setUser(userData);
        } else {
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const registerAction = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      let payload = {
        username: name,
        password: password,
        confirm_password: confirmPassword,
      };
      axiosInstance
        .post("/api/v1/auth/register", payload)
        .then((r) => {
          setIsSubmitting(false);
          localStorage.setItem("token", r.data.token);
          setValidationErrors(r.data.errors);
          console.log(r);
          localStorage.setItem(
            "user",
            JSON.stringify({ username: r.data.username})
          );
        })
        .catch(() => {
          setIsSubmitting(false);
        });
    },
    [name, email, password, confirmPassword]
  );

  const loginAction = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      let payload = {
        username: name,
        password: password,
      };

      axiosInstance
        .post("/api/v1/auth/login", payload)
        .then(({ data }) => {
          setValidationErrors(data.errors);
          setIsSubmitting(false);
          const accessToken = data.data.token;
          console.log(accessToken)
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem(
            "user",
            JSON.stringify({
              username: data.username,
            })
          );
          router.push("/");
        })

        .catch((Error) => {
          setIsSubmitting(false);
          console.log(Error);
          if (Error.response && Error.response.status === 422) {
            setValidationErrors(Error.response.data.errors);
          } else {
            console.error("An error occurred:", Error);
          }
        });
    },
    [email, password]
  );

  const logoutAction = React.useCallback(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("Access token not found");
      return;
    }

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    axiosInstance
      .post("/api/v1/auth/logout", null, { headers })
      .then((response) => {
        if (response.data.success) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          router.push("/auth/login");
        } else {
          console.error("Logout failed");
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  }, []);

  return React.useMemo(
    () => ({
      registerAction,
      loginAction,
      logoutAction,
      user,
      name,
      setName,
      email,
      setEmail,
      password,
      setPassword,
      confirmPassword,
      setConfirmPassword,
      isSubmitting,
      validationErrors,
    }),
    [
      registerAction,
      loginAction,
      logoutAction,
      user,
      name,
      setName,
      email,
      setEmail,
      password,
      setPassword,
      confirmPassword,
      setConfirmPassword,
      isSubmitting,
      validationErrors,
    ]
  );
};
