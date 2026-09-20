import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Shield, Clock, Users, BarChart3, MapPin, AlertCircle, Zap } from "lucide-react";
import Button from "./components/ui/Button";
import Card from "./components/ui/Card";
import nivaraLogo from "./assets/nivara-logo-new.png";
import mitAdtLogo from "./assets/mit-adt-logo.png";
import mitCampus from "./assets/mit-adt-campus.jpg";
import "./styles/landing.css";

function Home() {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="landing-nav-container">
          <div className="landing-logos">
            <div className="landing-logo">
              <img src={nivaraLogo} alt="Nivara - MIT ADT University" className="landing-logo-image" />
            </div>
            <div className="landing-logo-divider"></div>
            <div className="landing-logo">
              <img src={mitAdtLogo} alt="MIT ADT University" className="landing-mit-logo-image" />
            </div>
          </div>
          
          <div className="landing-nav-actions">
            <Link to="/login">
              <Button variant="ghost" size="md">Student Portal</Button>
            </Link>
            <Link to="/admin-login">
              <Button variant="primary" size="md">Admin Login</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-overlay"></div>
        <div className="landing-hero-bg">
          <img src={mitCampus} alt="MIT ADT University Campus" className="landing-hero-bg-image" />
        </div>
        
        <div className="landing-hero-container">
          <div className="landing-hero-content">
            <div className="landing-hero-badge">
              <Shield size={14} />
              <span>Enterprise Campus Management</span>
            </div>
            
            <h1 className="landing-hero-title">
              Excellence in Campus
              <br />
              <span className="landing-hero-gradient">Infrastructure</span>
              <br />
              Support
            </h1>
            
            <p className="landing-hero-description">
              Empowering MIT ADT University with intelligent issue tracking, real-time resolution monitoring, 
              and seamless communication between students and administration.
            </p>

            <div className="landing-hero-actions">
              <Link to="/register">
                <Button variant="primary" size="lg" icon={<ArrowRight />} iconPosition="right">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="landing-trust-bar">
              <div className="landing-trust-item">
                <CheckCircle size={18} />
                <span>Enterprise Security</span>
              </div>
              <div className="landing-trust-divider"></div>
              <div className="landing-trust-item">
                <Shield size={18} />
                <span>JWT Protected</span>
              </div>
              <div className="landing-trust-divider"></div>
              <div className="landing-trust-item">
                <Zap size={18} />
                <span>Real-time Updates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="landing-stats-section">
        <div className="landing-stats-container">
          <div className="landing-stat-card">
            <div className="landing-stat-icon">
              <Users size={32} />
            </div>
            <div className="landing-stat-content">
              <div className="landing-stat-value">1000+</div>
              <div className="landing-stat-label">Active Students</div>
            </div>
          </div>
          
          <div className="landing-stat-card">
            <div className="landing-stat-icon">
              <CheckCircle size={32} />
            </div>
            <div className="landing-stat-content">
              <div className="landing-stat-value">95%</div>
              <div className="landing-stat-label">Resolution Rate</div>
            </div>
          </div>
          
          <div className="landing-stat-card">
            <div className="landing-stat-icon">
              <Clock size={32} />
            </div>
            <div className="landing-stat-content">
              <div className="landing-stat-value">24h</div>
              <div className="landing-stat-label">Avg Response Time</div>
            </div>
          </div>
          
          <div className="landing-stat-card">
            <div className="landing-stat-icon">
              <BarChart3 size={32} />
            </div>
            <div className="landing-stat-content">
              <div className="landing-stat-value">500+</div>
              <div className="landing-stat-label">Issues Resolved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features">
        <div className="landing-features-container">
          <div className="landing-section-header">
            <div className="landing-section-badge">Platform Features</div>
            <h2 className="landing-section-title">Enterprise-Grade Campus Management</h2>
            <p className="landing-section-description">
              Comprehensive tools designed for modern university infrastructure management
            </p>
          </div>

          <div className="landing-features-grid">
            <Card variant="outlined" padding="lg" className="landing-feature-card">
              <div className="landing-feature-icon-wrapper">
                <div className="landing-feature-icon">
                  <MapPin size={28} />
                </div>
              </div>
              <h3 className="landing-feature-title">Precise Location Tracking</h3>
              <p className="landing-feature-description">
                Comprehensive location management with building, floor, wing, and room identification for accurate issue reporting and faster resolution.
              </p>
              <div className="landing-feature-meta">
                <CheckCircle size={16} />
                <span>Multi-level hierarchy</span>
              </div>
            </Card>

            <Card variant="outlined" padding="lg" className="landing-feature-card">
              <div className="landing-feature-icon-wrapper">
                <div className="landing-feature-icon">
                  <AlertCircle size={28} />
                </div>
              </div>
              <h3 className="landing-feature-title">Smart Priority System</h3>
              <p className="landing-feature-description">
                Intelligent issue categorization with four priority levels (Low, Medium, High, Urgent) ensuring critical issues receive immediate attention.
              </p>
              <div className="landing-feature-meta">
                <CheckCircle size={16} />
                <span>Automated triage</span>
              </div>
            </Card>

            <Card variant="outlined" padding="lg" className="landing-feature-card">
              <div className="landing-feature-icon-wrapper">
                <div className="landing-feature-icon">
                  <Clock size={28} />
                </div>
              </div>
              <h3 className="landing-feature-title">Real-Time Status Updates</h3>
              <p className="landing-feature-description">
                Live tracking from submission to resolution with instant notifications and transparent communication between students and administration.
              </p>
              <div className="landing-feature-meta">
                <CheckCircle size={16} />
                <span>Instant notifications</span>
              </div>
            </Card>

            <Card variant="outlined" padding="lg" className="landing-feature-card">
              <div className="landing-feature-icon-wrapper">
                <div className="landing-feature-icon">
                  <Shield size={28} />
                </div>
              </div>
              <h3 className="landing-feature-title">Enterprise Security</h3>
              <p className="landing-feature-description">
                JWT-based authentication, role-based access control, and encrypted data transmission ensuring maximum security for sensitive campus information.
              </p>
              <div className="landing-feature-meta">
                <CheckCircle size={16} />
                <span>Bank-level encryption</span>
              </div>
            </Card>

            <Card variant="outlined" padding="lg" className="landing-feature-card">
              <div className="landing-feature-icon-wrapper">
                <div className="landing-feature-icon">
                  <BarChart3 size={28} />
                </div>
              </div>
              <h3 className="landing-feature-title">Advanced Analytics</h3>
              <p className="landing-feature-description">
                Comprehensive dashboards with visual insights, trend analysis, and performance metrics for data-driven decision making.
              </p>
              <div className="landing-feature-meta">
                <CheckCircle size={16} />
                <span>Interactive charts</span>
              </div>
            </Card>

            <Card variant="outlined" padding="lg" className="landing-feature-card">
              <div className="landing-feature-icon-wrapper">
                <div className="landing-feature-icon">
                  <Users size={28} />
                </div>
              </div>
              <h3 className="landing-feature-title">Role-Based Access</h3>
              <p className="landing-feature-description">
                Separate student and admin portals with granular permissions ensuring appropriate access levels and streamlined workflows.
              </p>
              <div className="landing-feature-meta">
                <CheckCircle size={16} />
                <span>Granular permissions</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing-cta">
        <div className="landing-cta-container">
          <div className="landing-cta-content">
            <h2 className="landing-cta-title">Ready to Transform Campus Operations?</h2>
            <p className="landing-cta-description">
              Join MIT ADT University in revolutionizing infrastructure management with Nivara
            </p>
            <div className="landing-cta-actions">
              <Link to="/register">
                <Button variant="primary" size="lg" icon={<ArrowRight />} iconPosition="right">
                  Get Started Today
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">
                  Access Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-container">
          <div className="landing-footer-main">
            <div className="landing-footer-brand">
              <img src={nivaraLogo} alt="Nivara" className="landing-footer-logo" />
              <p className="landing-footer-tagline">
                Enterprise campus infrastructure management for MIT ADT University
              </p>
            </div>
            
            <div className="landing-footer-links-group">
              <div className="landing-footer-section">
                <h4 className="landing-footer-section-title">Platform</h4>
                <div className="landing-footer-links">
                  <Link to="/login">Student Portal</Link>
                  <Link to="/admin-login">Admin Portal</Link>
                  <Link to="/register">Create Account</Link>
                </div>
              </div>
              
              <div className="landing-footer-section">
                <h4 className="landing-footer-section-title">Features</h4>
                <div className="landing-footer-links">
                  <a href="#features">Issue Tracking</a>
                  <a href="#features">Location Management</a>
                  <a href="#features">Analytics</a>
                </div>
              </div>
              
              <div className="landing-footer-section">
                <h4 className="landing-footer-section-title">Resources</h4>
                <div className="landing-footer-links">
                  <a href="#documentation">Documentation</a>
                  <a href="#support">Support</a>
                  <a href="#about">About MIT ADT</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="landing-footer-bottom">
            <div className="landing-footer-copyright">
              © 2026 Nivara - MIT ADT University. All rights reserved.
            </div>
            <div className="landing-footer-legal">
              <a href="#privacy">Privacy Policy</a>
              <span className="landing-footer-divider">•</span>
              <a href="#terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;