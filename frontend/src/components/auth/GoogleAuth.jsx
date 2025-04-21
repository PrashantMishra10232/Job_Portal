import { USER_API_ENDPOINT } from "@/utils/constant";
import React from "react";
import { FaGoogle } from "react-icons/fa";

const GoogleLoginButton = ({ role }) => {
    const handleGoogleLogin = () => {

        if (!role) {
            alert("Please select a role before signing up with Google.");
            return;
        }

        window.location.href = `${USER_API_ENDPOINT}/auth/google?role=${role}`;
    };

    return (
        <button
            onClick={handleGoogleLogin}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
            <FaGoogle />
            Continue with Google
        </button>
    );
};

export default GoogleLoginButton;
