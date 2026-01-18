import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AnalysisResults() {
  const { id } = useParams();

  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:5000/api/cases/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error("Failed to fetch case");

        const data = await res.json();
        setCaseData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCase();
  }, [id]);

  if (loading)
    return (
      <>
        <Navbar />
        <div className="status-text">Analyzing case...</div>
      </>
    );

  if (error)
    return (
      <>
        <Navbar />
        <div className="status-text error">{error}</div>
      </>
    );

  if (!caseData || !caseData.analysis)
    return (
      <>
        <Navbar />
        <div className="status-text">No analysis found.</div>
      </>
    );

  const {
    diagnosis = [],
    risk = {},
    guidelines = [],
    safetyAlerts = [],
    explanation = ""
  } = caseData.analysis;

  /* 🔥 NORMALIZE RISK (dynamic safety) */
  const score = risk.score ?? 0;
  const levelRaw = risk.level ?? "Low";
  const level = levelRaw.charAt(0).toUpperCase() + levelRaw.slice(1).toLowerCase();
  const message = risk.message ?? "Risk assessment unavailable.";

  /* 🔥 EXPLANATION PARSER (supports bullets OR paragraphs) */
  const explanationPoints = explanation
    .split("\n")
    .flatMap(line => line.split("•"))
    .map(p => p.trim())
    .filter(Boolean);

  return (
    <>
      <Navbar />

      {/* 🔥 STYLES */}
      <style>{`
        body {
          background: #f4f7fb;
        }

        .analysis-container {
          max-width: 1150px;
          margin: 40px auto;
          padding: 40px;
        }

        h1 {
          text-align: center;
          font-size: 34px;
          margin-bottom: 40px;
          font-weight: 700;
          color: #0f172a;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
        }

        .card {
          background: #ffffff;
          border-radius: 16px;
          padding: 22px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.07);
        }

        .card h3 {
          margin-bottom: 14px;
          font-size: 18px;
          font-weight: 600;
          color: #020617;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .risk {
          border-left: 6px solid ${
            level === "High"
              ? "#dc2626"
              : level === "Moderate"
              ? "#f59e0b"
              : "#16a34a"
          };
        }

        .badge {
          display: inline-block;
          padding: 4px 14px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          margin-left: 6px;
          background: ${
            level === "High"
              ? "#fee2e2"
              : level === "Moderate"
              ? "#fef3c7"
              : "#dcfce7"
          };
          color: ${
            level === "High"
              ? "#991b1b"
              : level === "Moderate"
              ? "#92400e"
              : "#166534"
          };
        }

        ul {
          padding-left: 18px;
          margin-top: 6px;
        }

        li {
          margin-bottom: 8px;
          font-size: 15px;
          color: #334155;
        }

        .diagnosis-item {
          padding: 10px 0;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          font-size: 15px;
        }

        .diagnosis-item:last-child {
          border-bottom: none;
        }

        .confidence {
          font-weight: 600;
          color: #2563eb;
        }

        .empty {
          font-size: 14px;
          color: #64748b;
          font-style: italic;
        }

        .status-text {
          padding: 50px;
          text-align: center;
          font-size: 18px;
        }

        .status-text.error {
          color: red;
        }

        .explanation-box {
          margin-top: 28px;
          padding: 30px 34px;
          background: linear-gradient(135deg, #f8fafc, #eef2ff);
          border-radius: 20px;
          box-shadow: 0 14px 40px rgba(0,0,0,0.08);
        }

        .explanation-box h3 {
          font-size: 19px;
          font-weight: 600;
          margin-bottom: 18px;
          color: #020617;
        }

        .explanation-point {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 16px;
          line-height: 1.75;
          color: #1e293b;
          margin-bottom: 10px;
        }

        .dot {
          font-size: 18px;
          color: #2563eb;
          margin-top: 3px;
        }
      `}</style>

      <div className="analysis-container">
        <h1>Clinical Analysis Report</h1>

        <div className="grid">
          <section className="card risk">
            <h3>⚠️ Risk Assessment</h3>
            <p>
              <strong>Risk Level:</strong>
              <span className="badge">{level}</span>
            </p>
            <p>
              <strong>Risk Score:</strong> {score}/100
            </p>
            <p>{message}</p>
          </section>

          <section className="card">
            <h3>🧠 Differential Diagnosis</h3>

            {diagnosis.length === 0 && (
              <div className="empty">
                No differential diagnoses identified based on current data.
              </div>
            )}

            {diagnosis.map((d, i) => (
              <div key={i} className="diagnosis-item">
                <strong>{typeof d === "string" ? d : d.name}</strong>
                {d.confidence !== undefined && (
                  <span className="confidence">
                    {(d.confidence * 100).toFixed(0)}%
                  </span>
                )}
              </div>
            ))}
          </section>

          <section className="card">
            <h3>📘 Guidelines</h3>
            <ul>{guidelines.map((g, i) => <li key={i}>{g}</li>)}</ul>
          </section>

          <section className="card">
            <h3>🚨 Safety Alerts</h3>
            <ul>{safetyAlerts.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </section>
        </div>

        <section className="explanation-box">
          <h3>🧾 Clinical Explanation</h3>

          {explanationPoints.map((p, i) => (
            <div key={i} className="explanation-point">
              <span className="dot">•</span>
              <span>{p}</span>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
