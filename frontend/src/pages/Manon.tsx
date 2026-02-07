import React, { useState, useEffect } from 'react';

const Manon: React.FC = () => {
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const startDate = new Date('2025-08-05T19:28:00+02:00'); // Heure française (UTC+2 en été)

    const calculateTimeElapsed = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      
      // Calcul approximatif des mois et années
      const totalMonths = Math.floor(days / 30.44);
      const years = Math.floor(totalMonths / 12);
      const months = totalMonths % 12;
      const remainingDays = Math.floor(days - (totalMonths * 30.44));

      setTimeElapsed({
        years,
        months,
        days: remainingDays,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60,
      });
    };

    calculateTimeElapsed();
    const interval = setInterval(calculateTimeElapsed, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ff6b9d 0%, #c94b8b 50%, #8b4789 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Agbalumo", cursive',
        color: '#fff',
        padding: 'clamp(15px, 5vw, 20px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating hearts animation */}
			<style>
				{`
					@import url('https://fonts.googleapis.com/css2?family=Agbalumo&display=swap');

					@keyframes float {
				0% {
					transform: translateY(-100vh) rotate(0deg);
					opacity: 0;
				}
				10% {
					opacity: 1;
				}
				90% {
					opacity: 1;
				}
				100% {
					transform: translateY(100vh) rotate(360deg);
					opacity: 0;
				}
					}

					.heart {
				position: absolute;
				font-size: 30px;
				animation: float linear infinite;
				pointer-events: none;
				opacity: 0;
					}

					.heart:nth-of-type(1) { left: 5%; animation-duration: 15s; animation-delay: -12s; }
					.heart:nth-of-type(2) { left: 10%; animation-duration: 18s; animation-delay: -25s; }
					.heart:nth-of-type(3) { left: 15%; animation-duration: 20s; animation-delay: -7s; }
					.heart:nth-of-type(4) { left: 20%; animation-duration: 16s; animation-delay: -33s; }
					.heart:nth-of-type(5) { left: 25%; animation-duration: 19s; animation-delay: -14s; }
					.heart:nth-of-type(6) { left: 30%; animation-duration: 17s; animation-delay: -38s; }
					.heart:nth-of-type(7) { left: 35%; animation-duration: 21s; animation-delay: -3s; }
					.heart:nth-of-type(8) { left: 40%; animation-duration: 15s; animation-delay: -29s; }
					.heart:nth-of-type(9) { left: 45%; animation-duration: 18s; animation-delay: -9s; }
					.heart:nth-of-type(10) { left: 50%; animation-duration: 20s; animation-delay: -35s; }
					.heart:nth-of-type(11) { left: 55%; animation-duration: 16s; animation-delay: -5s; }
					.heart:nth-of-type(12) { left: 60%; animation-duration: 19s; animation-delay: -22s; }
					.heart:nth-of-type(13) { left: 65%; animation-duration: 17s; animation-delay: -16s; }
					.heart:nth-of-type(14) { left: 70%; animation-duration: 21s; animation-delay: -40s; }
					.heart:nth-of-type(15) { left: 75%; animation-duration: 15s; animation-delay: -11s; }
					.heart:nth-of-type(16) { left: 80%; animation-duration: 18s; animation-delay: -27s; }
					.heart:nth-of-type(17) { left: 85%; animation-duration: 20s; animation-delay: -2s; }
					.heart:nth-of-type(18) { left: 90%; animation-duration: 16s; animation-delay: -19s; }
				`}
			</style>

			{/* Floating hearts */}
				{[...Array(18)].map((_, i) => {
					const heartEmojis = ['❤️', '💕', '💖', '💘', '💞'];
					return (
						<div key={i} className="heart">
					{heartEmojis[i % heartEmojis.length]}
						</div>
					);
				})}

						{/* Main content */}
      {/* Main content */}
      <div style={{ zIndex: 1, textAlign: 'center', maxWidth: '900px' }}>
        <h1
          style={{
            fontSize: 'clamp(3rem, 10vw, 6rem)',
            marginBottom: '60px',
            fontWeight: '600',
            letterSpacing: '-0.5px',
            opacity: 0.95,
          }}
        >
          Manon & Marin
        </h1>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center',
          }}
        >
          {/* Ligne 1: années, mois, jours */}
          <div style={{ 
            display: 'flex', 
            gap: 'clamp(15px, 4vw, 30px)',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'baseline',
          }}>
            {timeElapsed.years > 0 && (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: '700' }}>
                  {String(timeElapsed.years)}
                </span>
                <span style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.3rem)', opacity: 0.7, fontWeight: '400' }}>
                  ans
                </span>
              </div>
            )}
            {(timeElapsed.years > 0 || timeElapsed.months > 0) && (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: '700' }}>
                  {String(timeElapsed.months)}
                </span>
                <span style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.3rem)', opacity: 0.7, fontWeight: '400' }}>
                  mois
                </span>
              </div>
            )}
						{(timeElapsed.days > 0) && (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: '700' }}>
                  {String(timeElapsed.days)}
                </span>
                <span style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.3rem)', opacity: 0.7, fontWeight: '400' }}>
                  jours
                </span>
              </div>
            )}
          </div>

          {/* Ligne 2: heures, minutes, secondes */}
          <div style={{ 
            display: 'flex', 
            gap: 'clamp(15px, 4vw, 30px)',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'baseline',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: '700' }}>
                {String(timeElapsed.hours).padStart(2, '0')}
              </span>
              <span style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.3rem)', opacity: 0.7, fontWeight: '400' }}>
                heures
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: '700' }}>
                {String(timeElapsed.minutes).padStart(2, '0')}
              </span>
              <span style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.3rem)', opacity: 0.7, fontWeight: '400' }}>
                minutes
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: '700' }}>
                {String(timeElapsed.seconds).padStart(2, '0')}
              </span>
              <span style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.3rem)', opacity: 0.7, fontWeight: '400' }}>
                secondes
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manon;