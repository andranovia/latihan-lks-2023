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
  name: string;
  password: number;
  born_date: string;
  regional_id: number;


}

export const useAuth = () => {
  const router = useRouter();
  const [idCard, setidCard] = useState("");
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

  const loginAction = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      let payload = {
        id_card_number: idCard,
        password: password,
      };

      axiosInstance
        .post("/api/v1/auth/login", payload)
        .then(({ data }) => {
          setValidationErrors(data.errors);
          setIsSubmitting(false);
          console.log(data)
          const accessToken = data.data.token;
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
    [idCard, password]
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
      loginAction,
      logoutAction,
      user,
      idCard,
      setidCard,
      password,
      setPassword,
      confirmPassword,
      setConfirmPassword,
      isSubmitting,
      validationErrors,
    }),
    [
      loginAction,
      logoutAction,
      user,
      idCard,
      setidCard,
      password,
      setPassword,
      confirmPassword,
      setConfirmPassword,
      isSubmitting,
      validationErrors,
    ]
  );
};
