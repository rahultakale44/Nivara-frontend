import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import "../styles/auth.css";
import api from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStudentLogin = () => {
    setEmail("dileeptakale@gmail.com");
    setPassword("123456");
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

      if (role !== "STUDENT") {
        toast.error("Please use administrator access.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      toast.success("Login Successful!");

      setTimeout(() => {
        navigate("/student-dashboard", { replace: true });
      }, 800);
    } catch (error) {
      console.log(error.response?.data);

      toast.error(
        error.response?.data?.message ||
          "Login Failed! Check email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Link to="/admin-login" className="auth-switch-link">
        Administrator Access →
      </Link>

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <div className="auth-logo-icon">N</div>
            <div className="auth-brand-name">Nivara</div>
          </div>
          <h1 className="auth-title">Student Login</h1>
          <p className="auth-subtitle">Access your MIT ADT campus support account</p>
        </div>

        <div className="auth-demo-buttons">
          <button type="button" onClick={handleStudentLogin} className="auth-demo-button">
            Fill Demo Student Credentials
          </button>
        </div>

        <div className="auth-divider">
          <span>or continue with email</span>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <Input
            label="Email Address"
            type="email"
            placeholder="student@mituniversity.edu.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
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
            {loading ? "Logging In..." : "Login"}
          </Button>
        </form>

        <div className="auth-footer">
          New student? <Link to="/register">Create account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;