import { useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom

const RedirectOnLoad = () => {
  const navigate = useNavigate();  // Hook to access navigate function

  useEffect(() => {
    // Redirect to '/new-location' when the component mounts
    navigate("/login");
  }, [navigate]);  // Empty dependency array ensures it runs only once on mount

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
};

export default RedirectOnLoad;
