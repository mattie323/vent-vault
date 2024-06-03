/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../services/user/useUserStore";

interface AuthRedirectProps {
  children: React.ReactNode;
  redirectPath: string;
  shouldRedirect: (user: any) => boolean;
}

const AuthRedirect: React.FC<AuthRedirectProps> = ({
  children,
  redirectPath,
  shouldRedirect,
}) => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (shouldRedirect(user)) {
      navigate(redirectPath);
    }
  }, [user, navigate, redirectPath, shouldRedirect]);

  return shouldRedirect(user) ? null : (children as JSX.Element);
};

export default AuthRedirect;
