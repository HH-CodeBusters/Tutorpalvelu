import { Link } from "react-router";
import "../styles.css";
export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">TutorPalvelu TuPa</h1>

      <p className="home-description">
        TuPa on tutorpalvelu, joka yhdistää opiskelijat ja tutorit sujuvasti.
        Palvelun avulla voit varata tutorointiaikoja, tarkistaa tutorien
        saatavuuden ja hoitaa maksut helposti yhdessä järjestelmässä.
      </p>

      <section className="home-links-section">
        <div className="home-links">
          <Link to="/tutors" className="home-button-primary">
            Tuutorit
          </Link>

          <Link to="/calendar" className="home-button-secondary">
            Kalenteri
          </Link>

          <Link to="/profile" className="home-button-secondary">
            Oma profiili
          </Link>
        </div>
      </section>

      <section className="home-start-section">
        <h2>Aloita tästä</h2>

        <ol className="home-steps">
          <li>Etsi sopiva tuutori.</li>
          <li>Tarkista, milloin hän on vapaana.</li>
          <li>Varaa aika ja maksa helposti verkossa.</li>
          <li>Seuraa kalenterista tulevia tunteja.</li>
          <li>Hallinnoi omia tietojasi ja varauksiasi profiilissasi.</li>
          <li>Nauti sujuvasta tutorointikokemuksesta TuPan avulla!</li>
        </ol>
      </section>
    </div>
  );
}
