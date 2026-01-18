import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function NewCase() {
  const [mode, setMode] = useState("manual");
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/cases/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },

        // 🔥🔥🔥 ONLY FIX IS HERE 🔥🔥🔥
        body: JSON.stringify({
          age: 55,

          // VITALS
          systolicBP: 150,
          diastolicBP: 95,
          heartRate: 105,
          spo2: 94,
          temperature: 38.2,
          respiratoryRate: 22,

          // ✅ MUST BE ARRAYS (AGENTS EXPECT THIS)
          symptoms: [
            "chest pain",
            "breathlessness",
            "sweating"
          ],

          history: [
            "hypertension",
            "smoking"
          ],

          labs: [
            "Troponin",
            "ECG abnormal"
          ],

          medications: [
            "Amlodipine"
          ],

          allergies: []
        })
      });

      const data = await response.json();
      console.log("AI RESPONSE:", data);

      // ✅ NOW THIS WILL TRIGGER
      if (data.success && data.caseId) {
        navigate(`/case/${data.caseId}`);
      }

    } catch (err) {
      console.error("Analyze error:", err);
    }
  };

  return (
    <>
      <Navbar hideAuth />

      <div className="newcase-container">
        {/* HEADER */}
        <div className="page-header">
          <h1>New Clinical Case</h1>
          <p>
            Enter patient information manually or upload medical reports for
            AI-assisted analysis.
          </p>

          <div className="entry-toggle">
            <button
              className={mode === "manual" ? "active" : ""}
              onClick={() => setMode("manual")}
            >
              📄 Manual Entry
            </button>
            <button
              className={mode === "upload" ? "active" : ""}
              onClick={() => setMode("upload")}
            >
              ⬆️ Upload Reports
            </button>
          </div>
        </div>

        {/* ================= MANUAL ENTRY (UNCHANGED) ================= */}
        {mode === "manual" && (
          <>
            <section className="card">
              <div className="card-title">
                <span className="icon">👤</span>
                <h3>Patient Demographics</h3>
              </div>

              <div className="grid-3">
                <div>
                  <label>Patient ID</label>
                  <input placeholder="PT-2024-XXX" />
                </div>
                <div>
                  <label>Age</label>
                  <input placeholder="45" />
                </div>
                <div>
                  <label>Gender</label>
                  <select>
                    <option>Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="card">
              <div className="card-title">
                <span className="icon">🩺</span>
                <h3>Clinical Presentation</h3>
              </div>

              <label>Chief Complaint *</label>
              <input placeholder="Chest pain, breathlessness..." />

              <label>History of Present Illness</label>
              <textarea placeholder="Describe the onset, duration, severity, and associated symptoms..." />

              <label>Past Medical History</label>
              <textarea placeholder="Previous diagnoses, surgeries, hospitalizations..." />
            </section>

            <section className="card">
              <div className="card-title">
                <span className="icon">📈</span>
                <h3>Vital Signs</h3>
              </div>

              <div className="grid-5">
                <input placeholder="120/80" />
                <input placeholder="72 bpm" />
                <input placeholder="98.6°F" />
                <input placeholder="16/min" />
                <input placeholder="98%" />
              </div>

              <div className="grid-5 labels">
                <span>BP</span>
                <span>HR</span>
                <span>Temp</span>
                <span>RR</span>
                <span>SpO₂</span>
              </div>
            </section>

            <section className="card">
              <div className="card-title">
                <span className="icon">💊</span>
                <h3>Medications & Allergies</h3>
              </div>

              <div className="grid-2">
                <textarea placeholder="List current medications with dosages..." />
                <textarea placeholder="List any known drug or other allergies..." />
              </div>
            </section>

            <section className="card">
              <div className="card-title">
                <span className="icon">🧪</span>
                <h3>Laboratory Results</h3>
              </div>

              <textarea placeholder="CBC, BMP, Troponin, BNP, or other relevant lab values..." />
            </section>
          </>
        )}

        {/* ================= UPLOAD REPORTS (NEW ONLY) ================= */}
        {mode === "upload" && (
          <section className="card upload-card">
            <div className="card-title">
              <span className="icon">⬆️</span>
              <div>
                <h3>Upload Medical Reports</h3>
                <p className="upload-subtext">
                  Upload PDF reports for automated extraction
                </p>
              </div>
            </div>

            <div className="upload-box">
              <input type="file" multiple accept=".pdf" />
              <div className="upload-content">
                <div className="upload-icon">📄</div>
                <p>
                  <strong>Drag & drop files here</strong>
                </p>
                <span>or click to browse (PDF only, max 10MB)</span>
              </div>
            </div>
          </section>
        )}

        <div className="warning">
          ⚠️ AI outputs are for clinical decision support only.
        </div>

        <div className="action-bar">
          <button className="analyze-btn" onClick={handleAnalyze}>
            Analyze with AI Agents →
          </button>
        </div>
      </div>

      {/* ================= CSS (MANUAL ENTRY UNTOUCHED) ================= */}
      <style>{`
        * {
          box-sizing: border-box;
          font-family: Inter, sans-serif;
        }

        .newcase-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 80px 20px 100px;
        }

        .page-header h1 {
          font-size: 36px;
          margin-bottom: 8px;
        }

        .page-header p {
          color: #64748b;
          margin-bottom: 24px;
        }

        .entry-toggle {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #eef2f2;
          padding: 8px;
          border-radius: 18px;
          box-shadow: inset 0 0 0 10px #e5e7eb;
          margin-top: 10px;
        }

        .entry-toggle button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border-radius: 14px;
          border: none;
          background: transparent;
          cursor: pointer;
          font-weight: 600;
          color: #475569;
        }

        .entry-toggle .active {
          background: white;
          box-shadow: 0 8px 12px rgba(0,0,0,0.08);
          color: #0f766e;
        }

        .card {
          background: white;
          border-radius: 18px;
          padding: 30px;
          margin-top: 30px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.06);
        }

        .card-title {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .icon {
          background: #e6f4f2;
          padding: 10px;
          border-radius: 12px;
        }

        label {
          display: block;
          font-weight: 600;
          margin: 16px 0 6px;
        }

        input, select, textarea {
          width: 100%;
          padding: 14px 16px;
          border-radius: 14px;
          border: 1px solid #e5e7eb;
          font-size: 15px;
        }

        textarea {
          min-height: 120px;
          resize: vertical;
        }

        .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .grid-5 {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }

        .grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .labels {
          margin-top: 8px;
          font-size: 13px;
          color: #64748b;
          text-align: center;
        }

        .warning {
          margin-top: 30px;
          padding: 18px;
          background: #fff7ed;
          border-radius: 14px;
          color: #92400e;
          font-size: 14px;
        }

        .action-bar {
          display: flex;
          justify-content: flex-end;
          margin-top: 40px;
        }

        .analyze-btn {
          padding: 18px 28px;
          border-radius: 16px;
          border: none;
          font-size: 16px;
          font-weight: 700;
          color: white;
          cursor: pointer;
          background: linear-gradient(135deg, #0f766e, #2563eb);
        }

        @media (max-width: 900px) {
          .grid-3,
          .grid-5,
          .grid-2 {
            grid-template-columns: 1fr;
          }
        }

        /* ================= UPLOAD-ONLY CSS (NEW) ================= */

        .upload-subtext {
          color: #64748b;
          font-size: 14px;
          margin-top: 4px;
        }

        .upload-box {
          border: 2px dashed #cbd5e1;
          border-radius: 16px;
          padding: 50px;
          text-align: center;
          position: relative;
          cursor: pointer;
        }

        .upload-box input {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
        }

        .upload-content p {
          margin: 10px 0 4px;
          font-size: 16px;
        }

        .upload-content span {
          font-size: 14px;
          color: #64748b;
        }

        .upload-icon {
          font-size: 40px;
        }
      `}</style>
    </>
  );
}
