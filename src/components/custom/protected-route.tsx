import { Fragment, ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const token = true;
    return token ? <Fragment>{ children }</Fragment> : <Navigate to="/login" />;
}