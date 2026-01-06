import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>🎓 Bienvenue sur notre Plateforme de Formation</h1>
          <p className="hero-subtitle">Découvrez et suivez les meilleures formations professionnelles</p>
          <div className="hero-buttons">
            <button 
              onClick={() => navigate('/formations')}
              className="btn-primary"
            >
              Voir les formations
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="btn-secondary"
            >
              S'inscrire comme participant
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="btn-login"
            >
              Connexion
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Nos Services</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Formations Variées</h3>
            <p>Une large gamme de formations professionnelles dans différents domaines</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👨‍🏫</div>
            <h3>Formateurs Experts</h3>
            <p>Des formateurs qualifiés et expérimentés dans leur domaine</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏢</div>
            <h3>Partenaires Entreprises</h3>
            <p>Formations adaptées aux besoins réels des entreprises</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Suivi Personnalisé</h3>
            <p>Évaluations et suivi pour mesurer votre progression</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Objectifs Clairs</h3>
            <p>Chaque formation a des objectifs bien définis et un programme détaillé</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Évaluation de Qualité</h3>
            <p>Système d'évaluation transparent pour assurer la qualité</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>Comment ça marche ?</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Parcourir</h3>
            <p>Parcourez nos formations disponibles avec les filtres</p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step">
            <div className="step-number">2</div>
            <h3>Sélectionner</h3>
            <p>Choisissez la formation qui vous intéresse</p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step">
            <div className="step-number">3</div>
            <h3>S'inscrire</h3>
            <p>Complétez votre inscription avec vos informations</p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step">
            <div className="step-number">4</div>
            <h3>Suivre</h3>
            <p>Participez à la formation et apprenez</p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step">
            <div className="step-number">5</div>
            <h3>Évaluer</h3>
            <p>Évaluez votre formation et le formateur</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Prêt à commencer ?</h2>
        <p>Rejoignez notre communauté d'apprenants et développez vos compétences</p>
        <button 
          onClick={() => navigate('/formations')}
          className="btn-cta"
        >
          Découvrir nos formations
        </button>
      </section>

      {/* For Trainers Section */}
      <section className="trainers-section">
        <h2>Vous êtes formateur ?</h2>
        <p>Rejoignez notre plateforme et partagez votre expertise</p>
        <button 
          onClick={() => navigate('/register-formator')}
          className="btn-trainer"
        >
          S'inscrire comme formateur
        </button>
      </section>
    </div>
  );
};

export default HomePage;
