import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <main className="hero">
        <div className="hero-badge">
          ✨ AI-Powered Clinical Decision Support
        </div>

        <h1 className="hero-title">
          Intelligent Support for
          <br />
          <span>Clinical Decisions</span>
        </h1>

        <p className="hero-desc">
          A multi-agent AI system designed to assist healthcare professionals
          with differential diagnosis, risk assessment, and evidence-based
          recommendations.
        </p>

        <div className="hero-actions">
          <Link to="/signup">
            <button className="primary-btn">
              Start Using MediAI CDS →
            </button>
          </Link>

          <Link to="/dashboard">
            <button className="secondary-btn">
              View Demo Dashboard
            </button>
          </Link>
        </div>

        <div className="hero-meta">
          <span>🛡 HIPAA Compliant</span>
          <span>✔ Evidence-Based</span>
          <span>📘 Guideline Adherent</span>
        </div>
      </main>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <h2 className="features-title">
          Comprehensive Clinical Support
        </h2>

        <p className="features-subtitle">
          Built with healthcare professionals in mind, providing transparent
          and trustworthy AI assistance.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <span className="check">✔</span>
            <p>Multi-agent AI architecture with specialized medical agents</p>
          </div>

          <div className="feature-card">
            <span className="check">✔</span>
            <p>PDF medical report upload with automated data extraction</p>
          </div>

          <div className="feature-card">
            <span className="check">✔</span>
            <p>Differential diagnoses with confidence scores</p>
          </div>

          <div className="feature-card">
            <span className="check">✔</span>
            <p>Evidence-based treatment recommendations</p>
          </div>

          <div className="feature-card">
            <span className="check">✔</span>
            <p>Risk stratification using validated scoring systems</p>
          </div>

          <div className="feature-card">
            <span className="check">✔</span>
            <p>Explainable AI outputs for transparency</p>
          </div>
        </div>
      </section>

      {/* MULTI-AGENT ARCHITECTURE SECTION */}
      <section className="agents-section">
        <h2 className="agents-title">
          Multi-Agent AI Architecture
        </h2>

        <p className="agents-subtitle">
          Specialized AI agents collaborate through coordinated reasoning
          workflows to provide comprehensive clinical decision support.
        </p>

        <div className="agents-grid">
          <div className="agent-card">
            <div className="agent-icon">🧠</div>
            <h3>Orchestrator</h3>
            <span>Workflow Coordinator</span>
            <p>
              Manages multi-agent collaboration and coordinates reasoning
              workflows across all specialized agents.
            </p>
          </div>

          <div className="agent-card">
            <div className="agent-icon">🩺</div>
            <h3>Symptom Agent</h3>
            <span>Symptom Analysis</span>
            <p>
              Processes patient symptoms, history, and chief complaints to
              identify clinical patterns.
            </p>
          </div>

          <div className="agent-card">
            <div className="agent-icon">🧪</div>
            <h3>Lab Analysis Agent</h3>
            <span>Laboratory Interpretation</span>
            <p>
              Analyzes laboratory results, identifies abnormalities, and
              correlates findings with clinical context.
            </p>
          </div>

          <div className="agent-card">
            <div className="agent-icon">📊</div>
            <h3>Diagnosis Agent</h3>
            <span>Differential Diagnosis</span>
            <p>
              Generates ranked differential diagnoses with confidence scores
              based on integrated findings.
            </p>
          </div>

          <div className="agent-card">
            <div className="agent-icon">⚠️</div>
            <h3>Risk Agent</h3>
            <span>Risk Stratification</span>
            <p>
              Evaluates patient risk levels using validated scoring systems
              and predictive models.
            </p>
          </div>

          <div className="agent-card">
            <div className="agent-icon">📘</div>
            <h3>Guideline Agent</h3>
            <span>Evidence-Based Guidelines</span>
            <p>
              Matches clinical scenarios to current medical guidelines and
              best practices.
            </p>
          </div>

          <div className="agent-card">
            <div className="agent-icon">🛡️</div>
            <h3>Safety Agent</h3>
            <span>Safety Monitoring</span>
            <p>
              Checks for contraindications, drug interactions, and potential
              safety concerns.
            </p>
          </div>

          <div className="agent-card">
            <div className="agent-icon">💬</div>
            <h3>Explanation Agent</h3>
            <span>Explainable Outputs</span>
            <p>
              Translates clinical findings into understandable explanations
              for doctors and patients.
            </p>
          </div>
        </div>
      </section>
      {/* CTA SECTION */}
<section className="cta-section">
  <h2>Ready to Enhance Clinical Decision-Making?</h2>

  <p>
    Join healthcare professionals using AI-assisted clinical decision support
    for improved diagnostic accuracy and evidence-based care.
  </p>

  <Link to="/signup">
    <button className="cta-btn">
      Create Free Account →
    </button>
  </Link>
</section>

{/* FOOTER SECTION */}
<footer className="footer">
  <div className="footer-top">
    <div className="footer-brand">
      <div className="footer-logo">
        <span className="pulse">💓</span>
        <h3>
          MediAI<span>CDS</span>
        </h3>
      </div>

      <p>
        AI-powered Clinical Decision Support System designed for healthcare
        professionals, researchers, and academic institutions.
      </p>
    </div>

    <div className="footer-links">
      <div>
        <h4>Platform</h4>
        <a>Dashboard</a>
        <a>New Case</a>
        <a>Analysis Results</a>
        <a>Profile</a>
      </div>

      <div>
        <h4>Resources</h4>
        <a>Documentation</a>
        <a>API Reference</a>
        <a>Research Papers</a>
        <a>Case Studies</a>
      </div>

      <div>
        <h4>Legal & Compliance</h4>
        <a>Privacy Policy</a>
        <a>Terms of Service</a>
        <a>Contact Support</a>
      </div>
    </div>
  </div>

  <div className="footer-disclaimer">
    <strong>Medical Disclaimer:</strong> MediAI CDS is a clinical decision
    support tool designed to assist healthcare professionals. All outputs
    are for informational purposes only and should not be considered as
    final diagnoses or treatment recommendations. Clinical decisions must
    be made by qualified healthcare providers based on their professional
    judgment and patient-specific circumstances. This system complies with
    medical ethics guidelines and relevant healthcare regulations.
  </div>

  <div className="footer-bottom">
    <span>© 2024 MediAI CDS. All rights reserved.</span>
    <span>Designed for academic, clinical, and research use.</span>
  </div>
</footer>

    </>
  );
}
