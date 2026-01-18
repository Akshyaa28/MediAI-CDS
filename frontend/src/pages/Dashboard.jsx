import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/cases", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setCases(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getRiskColor = (level) => {
    if (level === "High") return "#ef4444";
    if (level === "Moderate") return "#f59e0b";
    return "#22c55e";
  };

  if (loading) {
    return <div style={styles.loading}>Loading Dashboard...</div>;
  }

  return (
    <>
      {/* ---------------- NAVBAR ---------------- */}
      <nav style={styles.navbar}>
        <div style={styles.navLeft}>
          <div style={styles.logo}>💓</div>
          <span style={styles.brand}>MediAICDS</span>
        </div>

        <div style={styles.navRight}>
          <span style={styles.navItem} onClick={() => navigate("/")}>
            Home
          </span>

          {/* ✅ Dashboard highlighted */}
          <span style={styles.activeBtn}>
            Dashboard
          </span>

          {/* ✅ New Case like normal text */}
          <span
            style={styles.navItem}
            onClick={() => navigate("/new-case")}
          >
            New Case
          </span>
        </div>
      </nav>

      {/* ---------------- DASHBOARD ---------------- */}
      <div style={styles.container}>
        <h1 style={styles.title}>📊 Clinical Decision Dashboard</h1>

        <div style={styles.grid}>
          {cases.map((c) => {
            const score = c.analysis?.risk?.score ?? 0;
            const level = c.analysis?.risk?.level ?? "Low";
            const color = getRiskColor(level);

            return (
              <div
                key={c._id}
                style={styles.card}
                onClick={() => navigate(`/case/${c._id}`)}
              >
                <div style={styles.header}>
                  <h3>Patient ID: {c.patientId || "N/A"}</h3>
                  <span style={{ ...styles.badge, background: color }}>
                    {level} Risk
                  </span>
                </div>

                <p style={styles.meta}>
                  Age: {c.age ?? "—"} | Gender: {c.gender || "—"}
                </p>

                <div style={styles.progressBg}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${score}%`,
                      background: color
                    }}
                  />
                </div>

                <p style={styles.score}>{score}% Risk</p>

                <p style={styles.time}>
                  Created: {new Date(c.createdAt).toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  navbar: {
    height: "70px",
    padding: "0 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb"
  },
  navLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  logo: {
    background: "linear-gradient(135deg,#06b6d4,#3b82f6)",
    color: "#fff",
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px"
  },
  brand: {
    fontSize: "20px",
    fontWeight: "700"
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "24px"
  },
  navItem: {
    fontSize: "15px",
    cursor: "pointer",
    color: "#475569"
  },

  /* ✅ ACTIVE DASHBOARD PILL */
  activeBtn: {
    background: "#e0f2fe",
    color: "#0284c7",
    padding: "8px 16px",
    borderRadius: "999px",
    fontWeight: "600"
  },

  container: {
    padding: "30px",
    background: "#f8fafc",
    minHeight: "calc(100vh - 70px)"
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "25px"
  },
  loading: {
    padding: "40px",
    fontSize: "20px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "20px"
  },
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    cursor: "pointer"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  badge: {
    padding: "6px 12px",
    borderRadius: "999px",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "600"
  },
  meta: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#475569"
  },
  progressBg: {
    width: "100%",
    height: "8px",
    background: "#e5e7eb",
    borderRadius: "10px",
    marginTop: "15px"
  },
  progressFill: {
    height: "100%",
    borderRadius: "10px"
  },
  score: {
    fontSize: "14px",
    fontWeight: "600",
    marginTop: "8px"
  },
  time: {
    fontSize: "12px",
    color: "#64748b",
    marginTop: "12px"
  }
};
