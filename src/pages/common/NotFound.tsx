import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { PATHS } from "@/routes/paths";
import { TOKEN } from "@/utils/constants";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem(TOKEN);

  const handleBackHome = () => {
    if (isLoggedIn) {
      navigate(PATHS.CLIENT_HOME);
    } else {
      navigate(PATHS.HOME);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 150px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Result
        icon={
          <Icon
            icon="solar:confounded-square-bold"
            style={{ fontSize: "100px", color: "var(--dark-red)" }}
          />
        }
        title={
          <h1 style={{ color: "var(--dark-red)", fontSize: "2rem" }}>404</h1>
        }
        subTitle={
          <p style={{ color: "var(--blue-text)", fontSize: "1.1rem" }}>
            Oops! The page you're looking for doesn't exist.
          </p>
        }
        extra={
          <Button
            type="primary"
            size="large"
            onClick={handleBackHome}
            style={{
              backgroundColor: "var(--dark-red)",
              borderColor: "var(--dark-red)",
              height: "45px",
              padding: "0 30px",
              borderRadius: "8px",
              fontWeight: "600",
            }}
          >
            Back to Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
