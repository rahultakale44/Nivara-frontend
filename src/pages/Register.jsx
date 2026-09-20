import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import "../styles/auth.css";
import api from "../api/api";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth/register", {
        fullName,
        email,
        password,
      });

      toast.success("Account created successfully! Please login.");
      navigate("/login");
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data || "Registration Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Link to="/login" className="auth-switch-link">
        ← Back to Login
      </Link>

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <div className="auth-logo-icon">N</div>
            <div className="auth-brand-name">Nivara</div>
          </div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Register for MIT ADT campus support access</p>
        </div>

        <form onSubmit={handleRegister} className="auth-form">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

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
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            loading={loading}
            fullWidth
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <div className="auth-footer">
          Already registered? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;