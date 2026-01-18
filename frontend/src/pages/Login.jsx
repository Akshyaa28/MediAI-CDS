import { useState } from "react";
import { Link } from "react-router-dom";
export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // Save token
    localStorage.setItem("token", data.token);

    alert("Logged in successfully 🚀");
  } catch (err) {
    alert("Server error ❌");
  }
};


  return (
    <>
      <div className="login-container">
        {/* LEFT PANEL */}
        <div className="login-left">
          {/* BRAND */}
          <div className="brand-header">
            <div className="brand-logo">💙</div>
            <span className="brand-text">MediAICDS</span>
          </div>

          <h1>Welcome back</h1>
          <p className="subtitle">
            Sign in to access your clinical decision support dashboard.
          </p>

          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <div className="input-group">
              <span className="icon">✉️</span>
              <input
                type="email"
                name="email"
                placeholder="doctor@hospital.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="password-row">
              <label>Password</label>
              <span className="forgot">Forgot password?</span>
            </div>

            <div className="input-group">
              <span className="icon">🔒</span>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="login-btn">
              Sign In →
            </button>
          </form>

          <p className="bottom-text">
  Don't have an account?{" "}
  <Link to="/signup">Create account</Link>
</p>
        </div>

        {/* RIGHT PANEL */}
        <div className="login-right">
          <h2>AI-Powered Clinical Intelligence</h2>
          <p className="right-desc">
            Leverage multi-agent AI to enhance diagnostic accuracy,
            reduce cognitive load, and ensure evidence-based clinical decisions.
          </p>

          <ul className="features">
            <li>Collaborative AI agent architecture</li>
            <li>Real-time clinical decision support</li>
            <li>Evidence-based recommendations</li>
          </ul>
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

        .login-container {
          display: flex;
          min-height: 100vh;
          width: 100%;
        }

        /* LEFT */
        .login-left {
          flex: 1;
          padding: 50px;
          background: #ffffff;
        }

        .brand-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 50px;
        }

        .brand-logo {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          background: linear-gradient(135deg, #0f766e, #2563eb);
          color: white;
        }

        .brand-text {
          font-size: 20px;
          font-weight: 700;
        }

        h1 {
          font-size: 36px;
          margin-bottom: 10px;
        }

        .subtitle {
          color: #64748b;
          margin-bottom: 40px;
        }

        label {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 6px;
          display: block;
        }

        .password-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
        }

        .forgot {
          font-size: 13px;
          color: #0f766e;
          cursor: pointer;
          font-weight: 600;
        }

        .input-group {
          display: flex;
          align-items: center;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 14px 16px;
          margin-bottom: 20px;
          gap: 10px;
        }

        .icon {
          opacity: 0.6;
        }

        input {
          border: none;
          outline: none;
          font-size: 15px;
          width: 100%;
        }

        .login-btn {
          margin-top: 10px;
          width: 100%;
          padding: 16px;
          border-radius: 16px;
          border: none;
          font-size: 16px;
          font-weight: 700;
          color: white;
          cursor: pointer;
          background: linear-gradient(135deg, #0f766e, #2563eb);
        }

        .bottom-text {
          margin-top: 30px;
          font-size: 14px;
          text-align: center;
          color: #64748b;
        }

        .bottom-text span {
          color: #0f766e;
          font-weight: 600;
          cursor: pointer;
        }

        /* RIGHT */
        .login-right {
          flex: 1;
          padding: 80px;
          color: white;
          background: radial-gradient(circle at top right, #0f766e, #020617);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .login-right h2 {
          font-size: 42px;
          margin-bottom: 20px;
        }

        .right-desc {
          font-size: 18px;
          line-height: 1.6;
          max-width: 460px;
          opacity: 0.9;
          margin-bottom: 40px;
        }

        .features {
          list-style: none;
          padding: 0;
        }

        .features li {
          margin-bottom: 16px;
          padding-left: 26px;
          position: relative;
          opacity: 0.9;
        }

        .features li::before {
          content: "●";
          position: absolute;
          left: 0;
          color: #14b8a6;
        }

        @media (max-width: 900px) {
          .login-container {
            flex-direction: column;
          }

          .login-left,
          .login-right {
            padding: 50px;
          }
        }
      `}</style>
    </>
  );
}
