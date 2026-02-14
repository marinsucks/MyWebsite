import React, { useState, useEffect } from 'react';
import loverboyImg from '@assets/photos/loverboy.png';
import cutecatGif from '@assets/photos/cutecat.gif';

const Manon: React.FC = () => {
  const [timeElapsed, setTimeElapsed] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
  });

  const [refuseClickCount, setRefuseClickCount] = useState(0);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const refuseMessages = [
    "T'es sûre ?",
    "Vraiment sûre ?",
    "Réfléchis bien...",
    "Tu vas le regretter",
    "Bon, sérieusement ?",
    "C'est ta dernière chance",
    "Attend, réfléchis encore",
    "Je suis sympa pourtant",
    "On peut en discuter ?",
    "C'est pas grave si tu dis non... 😢",
    "Mais j'ai préparé des choses !",
    "Tu préfères rester seule ?",
    "Netflix c'est bien aussi...",
    "Je comprends pas là",
    "Un dernier mot ?",
    "Tu changes jamais d'avis ?",
    "Même après tout ce texte ?",
    "J'ai passé du temps là-dessus",
    "Le post-it te plaît pas ?",
    "Le fond rose non plus ?",
    "Les cœurs qui tombent alors ?",
    "Tu aimes pas la Saint-Valentin ?",
    "C'est Mikie qui t'a dit de refuser ?",
    "Je peux changer !",
    "Qu'est-ce qui te ferait dire oui ?",
    "Un indice au moins ?",
    "Je fais quoi maintenant ?",
    "Tu rigoles j'espère",
    "C'est une blague ?",
    "Haha très drôle",
    "OK tu m'as eu",
    "Mais là vraiment ?",
    "Pour de vrai de vrai ?",
    "100% sûre ?",
    "Genre vraiment vraiment ?",
    "Pas un petit doute ?",
    "Même 0.1% ?",
    "Allez un tout petit oui ?",
    "Juste pour voir ?",
    "On essaie ?",
    "Sans engagement ?",
    "Je promets rien",
    "Toi non plus d'ailleurs",
    "On verra bien",
    "Pas d'attente",
    "Juste un resto",
    "Et des chocolats",
    "C'est pas grand chose",
    "30 minutes de ton temps",
    "Ou 1h",
    "2h max",
    "On verra",
    "Ça dépend",
    "Du moment",
    "Et de toi",
    "Surtout de toi",
    "Bon OK...",
    "J'abandonne",
    "Enfin presque",
    "Pas vraiment",
    "Encore un peu",
    "Juste quelques clics",
    "Pour voir",
    "Où est ta limite",
    "De patience",
    "Parce que moi",
    "J'en ai",
    "Beaucoup",
    "Genre énormément",
    "Je peux continuer",
    "Longtemps",
    "Très longtemps",
    "Tu vas voir",
    "On est que au début",
    "J'ai préparé",
    "Plein de phrases",
    "Genre vraiment plein",
    "Tu veux savoir combien ?",
    "100 en fait",
    "Oui oui",
    "Cent phrases",
    "Pour te convaincre",
    "Ou t'énerver",
    "Les deux marchent",
    "Alors ?",
    "Tu dis oui ?",
    "Ou tu continues ?",
    "À cliquer",
    "Comme une folle",
    "Sur ce bouton",
    "Qui te provoque",
    "Un peu",
    "Beaucoup",
    "Passionnément",
    "À la folie",
    "... Pas du tout ?",
    "Bon écoute",
    "Je suis à court d'idées de texte 😅"
  ];

  useEffect(() => {
    const startDate = new Date('2025-08-05T19:28:00+02:00');

    const calculateTimeElapsed = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      const totalMinutes = Math.floor(diff / (1000 * 60));
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);
      const totalMonths = Math.floor(totalDays / 30.44);

      setTimeElapsed({
        months: totalMonths,
        days: Math.floor(totalDays - (totalMonths * 30.44)),
        hours: totalHours % 24,
        minutes: totalMinutes % 60,
      });
    };

    calculateTimeElapsed();
    const interval = setInterval(calculateTimeElapsed, 60000); // Update every minute

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
        justifyContent: 'flex-start',
        fontFamily: '"Cherry Bomb One", cursive',
        color: '#fff',
        padding: 'clamp(15px, 5vw, 20px)',
        paddingTop: 'clamp(40px, 8vh, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating hearts animation */}
			<style>
				{`
					@import url('https://fonts.googleapis.com/css2?family=Cherry+Bomb+One&display=swap');
					@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');

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
					@keyframes fadeIn {
						from {
							opacity: 0;
						}
						to {
							opacity: 1;
						}
					}				`}
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
      <div style={{ 
        zIndex: 1, 
        width: '100%', 
        maxWidth: '1150px',
        padding: '0 20px',
        margin: '0 auto',
      }}>
        {/* Site Title */}
        <h1
          style={{
            fontSize: 'clamp(2rem, 8vw, 5rem)',
            fontWeight: '700',
            marginBottom: 'clamp(30px, 6vh, 60px)',
            color: '#fff',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            fontFamily: '"Cherry Bomb One", cursive',
            letterSpacing: '1px',
            textAlign: 'center',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            padding: '0 10px',
          }}
        >
          AdopteUnMarin.fr
        </h1>

        {/* Container for side-by-side layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
            gap: '40px',
            alignItems: 'start',
          }}
        >
          {/* Post-it */}
          <div
            style={{
              background: 'linear-gradient(135deg, #ffd97d 0%, #ffcd56 100%)',
              borderRadius: '4px',
              padding: 'clamp(25px, 5vw, 40px)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)',
              transform: 'rotate(-1deg)',
              position: 'relative',
              fontFamily: '"Indie Flower", cursive',
              color: '#333',
              textAlign: 'left',
            }}
          >
          {/* Tape effect */}
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '20px',
              background: 'rgba(255, 255, 255, 0.4)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              borderRadius: '2px',
            }}
          />

          <h2
            style={{
              fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
              fontWeight: '700',
              marginBottom: '20px',
              color: '#d63384',
              textAlign: 'center',
              lineHeight: '1.3',
            }}
          >
            Manon Trashgirl
            <br />
            <span style={{ fontSize: '0.85em' }}>24 ans • Poitiers</span>
          </h2>

						<div
						style={{
							fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
							lineHeight: '1.6',
							marginBottom: '15px',
						}}
						>
						<h3
							style={{
							fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
							fontWeight: '700',
							marginBottom: '15px',
							color: '#d63384',
							textAlign: 'center',
							}}
						>
							🌹 Cherche date Saint-Valentin 🌹
						</h3>
						<p style={{ margin: '0 0 15px 0' }}>
							Kiffeuse kikoo jap sur les bords, passionnée par son chat et la techno,
							cherche un date pour la saint Valentin le 14 février 2026
						</p>
						<p style={{ margin: '0 0 15px 0' }}>
							<strong>Profil recherché :</strong> Un mec stylé, intelligent, riche, de préférence de plus de 1m90 qui me traitera comme une princesse ^^
						</p>
						<p style={{ margin: '0 0 0 0' }}>
							📍 Dispo sur Poitiers ou Paris
							<br />
							
						</p>
						</div>

          <div
            style={{
              marginTop: '20px',
              textAlign: 'center',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              fontStyle: 'italic',
              opacity: 0.8,
            }}
          >
            Réponses sérieuses uniquement !
          </div>
        </div>

        {/* Gmail Reply Section */}
        <div
          style={{
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
            color: '#202124',
            textAlign: 'left',
            overflow: 'hidden',
          }}
        >
          {/* Dropdown Header */}
          <div
            onClick={() => setIsReplyOpen(!isReplyOpen)}
            style={{
              padding: 'clamp(15px, 3vw, 20px)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: isReplyOpen ? '#f8f9fa' : '#fff',
              transition: 'background 0.2s ease',
              borderBottom: isReplyOpen ? '1px solid #e0e0e0' : 'none',
            }}
            onMouseEnter={(e) => {
              if (!isReplyOpen) e.currentTarget.style.background = '#f8f9fa';
            }}
            onMouseLeave={(e) => {
              if (!isReplyOpen) e.currentTarget.style.background = '#fff';
            }}
          >
            <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', fontWeight: '500' }}>
              {isReplyOpen ? '▼' : '▶'} Voir <span style={{ 
                background: '#d63384', 
                color: '#fff', 
                padding: '2px 8px', 
                borderRadius: '12px',
                fontSize: '0.9em',
                fontWeight: '600',
              }}>1</span> réponse
            </span>
          </div>

          {/* Gmail Content (collapsible) */}
          {isReplyOpen && (
            <div style={{ padding: 'clamp(20px, 4vw, 30px)' }}>
              {/* Gmail Header */}
              <div style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '15px', marginBottom: '20px' }}>
                <div style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', fontWeight: '500', marginBottom: '12px', color: '#202124' }}>
                  Re: Cherche date Saint-Valentin
                </div>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <img 
                    src={loverboyImg} 
                    alt="Marin" 
                    onClick={() => setShowPhotoModal(true)}
                    style={{ 
                      width: 'clamp(70px, 15vw, 80px)', 
                      height: 'clamp(70px, 15vw, 80px)', 
                      borderRadius: '50%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                      flexShrink: 0,
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }} 
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.25)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
                    }}
                  />
                  <div style={{ fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', color: '#5f6368', lineHeight: '1.6' }}>
                    <div><strong>De :</strong> Marin Bigboss</div>
                    <div><strong>À :</strong> Manon Trashgirl</div>
                    <div><strong>Date :</strong> 14 février 2026</div>
                  </div>
                </div>
          </div>

          {/* Email Body */}
          <div style={{ fontSize: 'clamp(0.95rem, 2.2vw, 1.05rem)', lineHeight: '1.7', color: '#3c4043' }}>
            <p style={{ margin: '0 0 20px 0' }}>
              Salut Manon,
            </p>
            
            <p style={{ margin: '0 0 20px 0' }}>
              J'ai vu passer ton annonce, elle m'intéresse de fou, j'aimerais beaucoup t'emmener en date !
            </p>

            <div style={{ margin: '25px 0' }}>
              <div style={{ fontWeight: '600', marginBottom: '10px', fontSize: 'clamp(1rem, 2.3vw, 1.1rem)' }}>
                Pourquoi je postule
              </div>
              <p style={{ margin: '0 0 15px 0' }}>
                Tu es littéralement la femme de mes rêves : une femme magnifique, drôle, intelligente et indépendante. J'adorerais t'inviter au resto afin de célébrer notre rencontre il y a{' '}
                <strong 
                  style={{ color: '#d63384', cursor: 'help' }}
                  title="Depuis le 5 août 2025 à 19h28"
                >
                  {timeElapsed.months} mois, {timeElapsed.days} jours, {timeElapsed.hours} heures et {timeElapsed.minutes} minutes
                </strong> !
              </p>
            </div>

            <div style={{ margin: '25px 0' }}>
              <div style={{ fontWeight: '600', marginBottom: '10px', fontSize: 'clamp(1rem, 2.3vw, 1.1rem)' }}>
                Pourquoi me choisir
              </div>
              <p style={{ margin: '0 0 10px 0' }}>
                Je corresponds totalement à toutes tes attentes, je suis notamment :
              </p>
              <ul style={{ margin: '0', paddingLeft: '20px', lineHeight: '1.8', listStyle: 'none' }}>
                <li>- Stylé</li>
                <li>- Intelligent - selon les contextes</li>
                <li>- + de 1m90 avec mes chaussures</li>
                <li>- Bon au lit</li>
              </ul>
              <p style={{ margin: '15px 0 0 0' }}>
                J'ai énormément de projets pour toi: des voyages, des dîners, des balades, des salons de thé... 
								Je suis prêt à t'accepter telle que tu es et à faire tous les efforts nécessaires pour garantir ton bonheur, car 
								je veux passer ma vie avec toi et te rendre heureuse !
              </p>
            </div>

            <p style={{ margin: '25px 0 20px 0' }}>
              Je pense avoir tout dit, si ma proposition t'intéresse, tu peux cliquer sur "accepter" en bas !
            </p>

            <p style={{ margin: '0 0 25px 0' }}>
              J'espère que tu accepteras, et si c'est le cas j'ai hâte de partager ce dîner avec toi !
            </p>

            <p style={{ margin: '0 0 25px 0' }}>
              Marin &lt;3
            </p>

            {/* Buttons */}
            <div style={{ 
              display: 'flex', 
              gap: '15px', 
              marginTop: '30px',
              flexWrap: 'wrap',
            }}>
              <button
                onClick={() => setShowSuccess(true)}
                style={{
                  background: '#d63384',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '24px',
                  padding: 'clamp(10px, 2vw, 14px) clamp(20px, 4vw, 32px)',
                  fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(214, 51, 132, 0.3)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(214, 51, 132, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(214, 51, 132, 0.3)';
                }}
              >
                ✨ J'accepte l'offre
              </button>
              
              <button
                onClick={() => setRefuseClickCount(prev => Math.min(prev + 1, refuseMessages.length - 1))}
                style={{
                  background: '#f1f3f4',
                  color: '#5f6368',
                  border: '1px solid #dadce0',
                  borderRadius: '24px',
                  padding: 'clamp(10px, 2vw, 14px) clamp(20px, 4vw, 32px)',
                  fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  minWidth: '200px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e8eaed';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f1f3f4';
                }}
              >
                {refuseClickCount === 0 ? 'Refuser' : refuseMessages[refuseClickCount]}
              </button>
            </div>
          </div>
            </div>
          )}
        </div>
      </div>
    </div>

      {/* Photo Modal */}
      {showPhotoModal && (
        <div
          onClick={() => setShowPhotoModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            animation: 'fadeIn 0.3s ease-in-out',
            padding: '20px',
            cursor: 'pointer',
          }}
        >
          <img 
            src={loverboyImg} 
            alt="Marin" 
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(255, 255, 255, 0.2)',
              objectFit: 'contain',
            }}
          />
        </div>
      )}

      {/* Success Overlay */}
      {showSuccess && (
        <div
          onClick={() => setShowSuccess(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 9999,
            animation: 'fadeIn 0.5s ease-in-out',
            overflowY: 'auto',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'clamp(20px, 4vw, 40px)',
              marginTop: '20px',
              marginBottom: '20px',
              maxWidth: '100%',
            }}
          >
            <img 
              src={cutecatGif} 
              alt="Celebration" 
              style={{
                maxWidth: 'min(400px, 80vw)',
                maxHeight: '40vh',
                borderRadius: '16px',
                objectFit: 'contain',
              }}
            />
            <h2
              style={{
                color: '#fff',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontFamily: '"Cherry Bomb One", cursive',
                textAlign: 'center',
                margin: 0,
                textShadow: '0 4px 12px rgba(255, 192, 203, 0.5)',
              }}
            >
              LETS GOOOOO !!!!! 😎😎😎😎
            </h2>
            
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: 'clamp(30px, 5vw, 50px)',
                maxWidth: 'min(700px, 90vw)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
              }}
            >
              <div
                style={{
                  color: '#fff',
                  fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                  fontFamily: '"Indie Flower", cursive',
                  textAlign: 'center',
                  lineHeight: '1.8',
                  marginBottom: '30px',
                }}
              >
                <span style={{ fontSize: '1.3em', display: 'block', marginBottom: '10px' }}>💕</span>
                Je savais que tu dirais oui...
                <br />
                Tu le regretteras pas, promis ! 
              </div>

              <div
                style={{
                  background: 'rgba(214, 51, 132, 0.3)',
                  borderLeft: '4px solid #d63384',
                  padding: 'clamp(20px, 4vw, 30px)',
                  borderRadius: '8px',
                  marginBottom: '25px',
                }}
              >
                <div
                  style={{
                    color: '#fff',
                    fontSize: 'clamp(1.05rem, 2.5vw, 1.3rem)',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
                    fontWeight: '600',
                    marginBottom: '15px',
                    letterSpacing: '0.5px',
                  }}
                >
                  📍 Point de rendez-vous
                </div>
                <div
                  style={{
                    color: '#fff',
                    fontSize: 'clamp(0.95rem, 2.2vw, 1.15rem)',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
                    lineHeight: '1.7',
                  }}
                >
                  <strong>Vendredi 14 février 2026</strong>
                  <br />
                  <strong>19h44 précises</strong> ⏰
                  <br />
                  Gare Montparnasse
                  <br />
                  <span style={{ fontSize: '0.9em', opacity: 0.95, fontStyle: 'italic' }}>
                    Je t'attendrai avec un bouquet de fleurs 💐
                  </span>
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: 'clamp(20px, 4vw, 25px)',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    color: '#ffd97d',
                    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                    fontFamily: '"Cherry Bomb One", cursive',
                    marginBottom: '10px',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  ✨ Un dîner t'attend ! ✨
									<br />
									(et peut être un cadeau...)
                </div>
                <div
                  style={{
                    color: '#fff',
                    fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
                    opacity: 0.9,
                    fontStyle: 'italic',
                  }}
                >
                  Prépare-toi pour une soirée géniale 🌹
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
	
		</div>
  );
};


export default Manon;