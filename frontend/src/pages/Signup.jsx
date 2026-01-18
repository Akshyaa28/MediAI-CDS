import { useState } from "react";
import { Link } from "react-router-dom"; 
export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    institution: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Signup failed");
      return;
    }

    alert("Account Created Successfully 🚀");
  } catch (err) {
    alert("Server error ❌");
  }
};


  return (
    <>
      <div className="signup-container">
        {/* LEFT PANEL */}
        <div className="signup-left">
          <h1>Join the Future of Clinical Care</h1>
          <p>
            Create your account to access AI-powered clinical decision support
            designed for healthcare professionals.
          </p>

          <div className="stats-grid">
            <div className="stat-card">
              <h2>8+</h2>
              <span>AI Agents</span>
            </div>
            <div className="stat-card">
              <h2>99.2%</h2>
              <span>Accuracy Rate</span>
            </div>
            <div className="stat-card">
              <h2>500+</h2>
              <span>Guidelines</span>
            </div>
            <div className="stat-card">
              <h2>24/7</h2>
              <span>Availability</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="signup-right">
          <div className="form-wrapper">

            {/* 🔥 TOP LOGO (LIKE REFERENCE IMAGE) */}
            <div className="right-header">
              <div className="right-logo">💙</div>
              <span className="right-title">MediAICDS</span>
            </div>

            <div className="form-header">
              <h2>Create your account</h2>
              <p>Get started with AI-powered clinical decision support.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Dr. Jane Smith"
                value={form.name}
                onChange={handleChange}
                required
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="doctor@hospital.com"
                value={form.email}
                onChange={handleChange}
                required
              />

              <label>Professional Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                required
              >
                <option value="">Select your role</option>
                <option>Physician</option>
                <option>Medical Resident</option>
                <option>Nurse Practitioner</option>
                <option>Clinical Researcher</option>
                <option>Medical Student</option>
                <option>Other Healthcare Professional</option>
              </select>

              <label>Institution</label>
              <input
                type="text"
                name="institution"
                placeholder="Hospital or University"
                value={form.institution}
                onChange={handleChange}
                required
              />

              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />

              <button type="submit" className="signup-btn">
                Create Account →
              </button>

              <p className="terms">
                By creating an account, you agree to our{" "}
                <span>Terms of Service</span> and <span>Privacy Policy</span>.
              </p>

              <p className="signin">
  Already have an account?{" "}
  <Link to="/login">Sign in</Link>
</p>

            </form>
          </div>
        </div>
      </div>

      {/* CSS */}
      <style>{`
        * {
          box-sizing: border-box;
          font-family: "Inter", sans-serif;
        }

        body {
          margin: 0;
        }

        .signup-container {
          display: flex;
          min-height: 100vh;
          width: 100%;
        }

        /* LEFT */
        .signup-left {
          flex: 1;
          padding: 80px;
          color: white;
          background: linear-gradient(135deg, #0f766e, #2563eb);
        }

        .signup-left h1 {
          font-size: 48px;
          margin-bottom: 18px;
        }

        .signup-left p {
          font-size: 18px;
          line-height: 1.6;
          max-width: 420px;
          opacity: 0.9;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 60px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.18);
          padding: 26px;
          border-radius: 16px;
        }

        /* RIGHT */
        .signup-right {
          flex: 1;
          padding: 40px 60px;
          overflow-y: auto;
        }

        .form-wrapper {
          max-width: 420px;
        }

        /* 🔥 RIGHT HEADER */
        .right-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .right-logo {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, #0f766e, #2563eb);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 18px;
        }

        .right-title {
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
        }

        .form-header h2 {
          font-size: 32px;
          margin-bottom: 6px;
        }

        .form-header p {
          color: #64748b;
          margin-bottom: 30px;
        }

        label {
          font-size: 14px;
          font-weight: 600;
          display: block;
          margin: 18px 0 6px;
        }

        input,
        select {
          width: 100%;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          font-size: 15px;
        }

        .signup-btn {
          margin-top: 28px;
          width: 100%;
          padding: 16px;
          border-radius: 14px;
          border: none;
          font-size: 16px;
          font-weight: 700;
          color: white;
          cursor: pointer;
          background: linear-gradient(135deg, #0f766e, #2563eb);
        }

        .terms,
        .signin {
          margin-top: 18px;
          font-size: 13px;
          color: #64748b;
          text-align: center;
        }

        .terms span,
        .signin span {
          color: #2563eb;
          font-weight: 600;
          cursor: pointer;
        }

        @media (max-width: 900px) {
          .signup-container {
            flex-direction: column;
          }

          .signup-left,
          .signup-right {
            padding: 50px;
          }
        }
      `}</style>
    </>
  );
}
