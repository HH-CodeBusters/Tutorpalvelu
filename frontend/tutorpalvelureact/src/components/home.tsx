import { Link } from 'react-router';

export default function Home() {
	return (
		<div style={{ padding: '40px', textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
			<h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>TutorPalvelu TuPa</h1>

			<p style={{ fontSize: '1.2rem', maxWidth: '680px', margin: '0 auto 40px' }}>
				TuPa on tutorpalvelu, joka yhdistää opiskelijat ja tutorit sujuvasti. Palvelun avulla
				voit varata tutorointiaikoja, tarkistaa tutorien saatavuuden ja hoitaa maksut helposti yhdessä järjestelmässä.
			</p>

			<section style={{ marginBottom: '36px' }}>
				<div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
					<Link
						to="/tutors"
						style={{
							padding: '12px 20px',
							borderRadius: '8px',
							backgroundColor: '#1976d2',
							color: '#fff',
							textDecoration: 'none',
							fontWeight: 600,
							minWidth: 180,
							textAlign: 'center',
						}}
					>
						Tuutorit
					</Link>
					<Link
						to="/calendar"
						style={{
							padding: '12px 20px',
							borderRadius: '8px',
							border: '2px solid #1976d2',
							color: '#1976d2',
							textDecoration: 'none',
							fontWeight: 600,
							minWidth: 180,
							textAlign: 'center',
						}}
					>
						Kalenteri
					</Link>
					<Link
						to="/profile"
						style={{
							padding: '12px 20px',
							borderRadius: '8px',
							border: '2px solid #1976d2',
							color: '#1976d2',
							textDecoration: 'none',
							fontWeight: 600,
							minWidth: 180,
							textAlign: 'center',
						}}
					>
						Oma profiili
					</Link>
				</div>
			</section>

			<section>
				<h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Aloita tästä</h2>
				<ol style={{ textAlign: 'left', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
					<li>
						Etsi sopiva tuutori.
					</li>
					<li>
						Tarkista, milloin hän on vapaana.
					</li>
					<li>
						Varaa aika ja maksa helposti verkossa.
					</li>
					<li>
						Seuraa kalenterista tulevia tunteja.
					</li>
					<li>
						Hallinnoi omia tietojasi ja varauksiasi profiilissasi.
					</li>
					<li>
						Nauti sujuvasta tutorointikokemuksesta TuPan avulla!
					</li>
				</ol>
			</section>
		</div>
	);
}
