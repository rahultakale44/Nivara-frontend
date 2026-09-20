import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import "../styles/auth.css";
import api from "../api/api";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = () => {
    setEmail("admin@campuscare.com");
    setPassword("admin123");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, role } = response.data;

      if (role !== "ADMIN") {
        toast.error("Admin access only!");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      toast.success("Admin Login Successful!");

      setTimeout(() => {
        navigate("/admin-dashboard", { replace: true });
      }, 800);
    } catch (error) {
      console.log(error.response?.data);

      toast.error(
        error.response?.data?.message ||
          "Admin Login Failed! Check email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Link to="/login" className="auth-switch-link">
        ← Student Login
      </Link>

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <div className="auth-logo-icon">N</div>
            <div className="auth-brand-name">Nivara</div>
          </div>
          <h1 className="auth-title">Admin Portal</h1>
          <p className="auth-subtitle">Restricted access for MIT ADT administrators</p>
        </div>

        <div className="auth-demo-buttons">
          <button type="button" onClick={handleAdminLogin} className="auth-demo-button">
            Fill Demo Admin Credentials
          </button>
        </div>

        <div className="auth-divider">
          <span>or continue with email</span>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <Input
            label="Admin Email"
            type="email"
            placeholder="admin@mituniversity.edu.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            loading={loading}
            fullWidth
          >
            {loading ? "Logging In..." : "Login as Admin"}
          </Button>
        </form>

        <div className="auth-footer">
          Student access? <Link to="/login">Go to student login</Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;