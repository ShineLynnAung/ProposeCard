import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

function App() {
  const heartCount = 200;
  const [count, setCount] = useState(null);
  const [showRotate, setShowRotate] = useState(true);
  const [showHearts, setShowHearts] = useState(false);
  const [startCountdown, setStartCountdown] = useState(false);
  const [loveText, setLoveText] = useState('');

  // Final phase states
  const [finalPhase, setFinalPhase] = useState(false);
  const [boxTouched, setBoxTouched] = useState(false);
  const [showFloatingHearts, setShowFloatingHearts] = useState(false);
  const [showFullScreenHearts, setShowFullScreenHearts] = useState(false);
  const [showFullScreenImage, setShowFullScreenImage] = useState(false);
  const [screenBlack, setScreenBlack] = useState(false);

  // Initial hearts for falling down animation
  const hearts = useMemo(() => {
    return Array.from({ length: heartCount }).map(() => ({
      left: Math.random() * 100,
      animationDelay: Math.random() * 2,
      animationDuration: 3 + Math.random() * 5,
      fontSize: 1 + Math.random() * 3,
    }));
  }, [heartCount]);

  // Hearts for floating (bottom to top) in final phase
  const floatingHearts = useMemo(() => {
    return Array.from({ length: 100 }).map(() => ({
      left: Math.random() * 100,
      animationDelay: Math.random() * 3,
      animationDuration: 3 + Math.random() * 2,
      fontSize: 1 + Math.random() * 2,
    }));
  }, []);

  useEffect(() => {
    // Step 1: Show phone rotate prompt 2s
    const rotateTimer = setTimeout(() => {
      setShowRotate(false);
      setShowHearts(true);

      // Step 2: Hearts fall 2s then start countdown
      const heartTimer = setTimeout(() => {
        setStartCountdown(true);
        setCount(3);
      }, 2000);

      return () => clearTimeout(heartTimer);
    }, 2000);

    return () => clearTimeout(rotateTimer);
  }, []);

  useEffect(() => {
    if (count !== null && count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else if (count === 0) {
      setStartCountdown(false);
      // Show I, Love, You with delay
      const delay = (text, delayTime) => setTimeout(() => setLoveText(text), delayTime);
      delay('I', 1000);
      delay('Love', 2000);
      delay('You', 3000);

      // After message, stop hearts & clear text, start final phase
      const stopHeartsTimer = setTimeout(() => {
        setShowHearts(false);
        setLoveText('');
        setFinalPhase(true);
      }, 4000);

      return () => clearTimeout(stopHeartsTimer);
    }
  }, [count]);

  // When user taps the box
  const handleBoxTouch = () => {
    if (boxTouched) return;
    setBoxTouched(true);
    setShowFloatingHearts(true);

    // After 3s floating hearts, show full screen hearts
    setTimeout(() => {
      setShowFloatingHearts(false);
      setShowFullScreenHearts(true);
    }, 3000);

    // After 6s, show full screen image
    setTimeout(() => {
      setShowFullScreenHearts(false);
      setShowFullScreenImage(true);
    }, 6000);

    // After 11s, fade screen to black
    setTimeout(() => {
      setScreenBlack(true);
    }, 11000);
  };

  return (
    <>
      {/* Rotate phone prompt */}
      {showRotate && (
        <div className="rotate-container">
          <div className="rotate-icon" />
          {/* <div>Please rotate your phone</div> */}
        </div>
      )}

      {/* Falling hearts */}
      {showHearts && (
        <div className="heart-container">
          {hearts.map((heart, i) => (
            <span
              key={i}
              className="heart"
              style={{
                left: `${heart.left}vw`,
                animationDelay: `${heart.animationDelay}s`,
                animationDuration: `${heart.animationDuration}s`,
                fontSize: `${heart.fontSize}rem`,
              }}
            >
              💗
            </span>
          ))}
        </div>
      )}

      {/* Countdown */}
      {startCountdown && count > 0 && count <= 3 && (
        <div key={count} className="countdown-mask ease-out">
          <span>{count}</span>
        </div>
      )}

      {/* Love Text */}
      {loveText && (
        <div key={loveText} className="countdown-mask ease-out">
          <span>{loveText}</span>
        </div>
      )}

      {/* Final Phase: Pink bg + box + touch text */}
      {finalPhase && !screenBlack && (
        <div className="final-phase-container">
          <div className="touch-text">Touch to see my love</div>

          <div
            className={`box ${boxTouched ? 'vibrate' : ''}`}
            onClick={handleBoxTouch}
            role="button"
            tabIndex={0}
            onKeyPress={e => {
              if (e.key === 'Enter') handleBoxTouch();
            }}
          >
            {!boxTouched && (
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="white" className="bi bi-fingerprint" viewBox="0 0 16 16">
  <path d="M8.06 6.5a.5.5 0 0 1 .5.5v.776a11.5 11.5 0 0 1-.552 3.519l-1.331 4.14a.5.5 0 0 1-.952-.305l1.33-4.141a10.5 10.5 0 0 0 .504-3.213V7a.5.5 0 0 1 .5-.5Z"/>
  <path d="M6.06 7a2 2 0 1 1 4 0 .5.5 0 1 1-1 0 1 1 0 1 0-2 0v.332q0 .613-.066 1.221A.5.5 0 0 1 6 8.447q.06-.555.06-1.115zm3.509 1a.5.5 0 0 1 .487.513 11.5 11.5 0 0 1-.587 3.339l-1.266 3.8a.5.5 0 0 1-.949-.317l1.267-3.8a10.5 10.5 0 0 0 .535-3.048A.5.5 0 0 1 9.569 8m-3.356 2.115a.5.5 0 0 1 .33.626L5.24 14.939a.5.5 0 1 1-.955-.296l1.303-4.199a.5.5 0 0 1 .625-.329"/>
  <path d="M4.759 5.833A3.501 3.501 0 0 1 11.559 7a.5.5 0 0 1-1 0 2.5 2.5 0 0 0-4.857-.833.5.5 0 1 1-.943-.334m.3 1.67a.5.5 0 0 1 .449.546 10.7 10.7 0 0 1-.4 2.031l-1.222 4.072a.5.5 0 1 1-.958-.287L4.15 9.793a9.7 9.7 0 0 0 .363-1.842.5.5 0 0 1 .546-.449Zm6 .647a.5.5 0 0 1 .5.5c0 1.28-.213 2.552-.632 3.762l-1.09 3.145a.5.5 0 0 1-.944-.327l1.089-3.145c.382-1.105.578-2.266.578-3.435a.5.5 0 0 1 .5-.5Z"/>
  <path d="M3.902 4.222a5 5 0 0 1 5.202-2.113.5.5 0 0 1-.208.979 4 4 0 0 0-4.163 1.69.5.5 0 0 1-.831-.556m6.72-.955a.5.5 0 0 1 .705-.052A4.99 4.99 0 0 1 13.059 7v1.5a.5.5 0 1 1-1 0V7a3.99 3.99 0 0 0-1.386-3.028.5.5 0 0 1-.051-.705M3.68 5.842a.5.5 0 0 1 .422.568q-.044.289-.044.59c0 .71-.1 1.417-.298 2.1l-1.14 3.923a.5.5 0 1 1-.96-.279L2.8 8.821A6.5 6.5 0 0 0 3.058 7q0-.375.054-.736a.5.5 0 0 1 .568-.422m8.882 3.66a.5.5 0 0 1 .456.54c-.084 1-.298 1.986-.64 2.934l-.744 2.068a.5.5 0 0 1-.941-.338l.745-2.07a10.5 10.5 0 0 0 .584-2.678.5.5 0 0 1 .54-.456"/>
  <path d="M4.81 1.37A6.5 6.5 0 0 1 14.56 7a.5.5 0 1 1-1 0 5.5 5.5 0 0 0-8.25-4.765.5.5 0 0 1-.5-.865m-.89 1.257a.5.5 0 0 1 .04.706A5.48 5.48 0 0 0 2.56 7a.5.5 0 0 1-1 0c0-1.664.626-3.184 1.655-4.333a.5.5 0 0 1 .706-.04ZM1.915 8.02a.5.5 0 0 1 .346.616l-.779 2.767a.5.5 0 1 1-.962-.27l.778-2.767a.5.5 0 0 1 .617-.346m12.15.481a.5.5 0 0 1 .49.51c-.03 1.499-.161 3.025-.727 4.533l-.07.187a.5.5 0 0 1-.936-.351l.07-.187c.506-1.35.634-2.74.663-4.202a.5.5 0 0 1 .51-.49"/>
</svg>
            )}
          </div>

          {/* Floating hearts bottom to top */}
          {showFloatingHearts && (
            <div className="floating-heart-container">
              {floatingHearts.map((heart, i) => (
                <span
                  key={i}
                  className="heart floating-heart"
                  style={{
                    left: `${heart.left}vw`,
                    animationDelay: `${heart.animationDelay}s`,
                    animationDuration: `${heart.animationDuration}s`,
                    fontSize: `${heart.fontSize}rem`,
                  }}
                >
                  💗
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Full screen hearts */}
      {showFullScreenHearts && (
        <div className="full-screen-heart-container">
          {floatingHearts.map((heart, i) => (
            <span
              key={i}
              className="heart full-screen-heart"
              style={{
                left: `${heart.left}vw`,
                animationDelay: `${heart.animationDelay}s`,
                animationDuration: `${heart.animationDuration}s`,
                fontSize: `${heart.fontSize}rem`,
              }}
            >
              ❤️
            </span>
          ))}
        </div>
      )}

      {/* Full screen surprise image */}
      {showFullScreenImage && (
        <div className="full-screen-image-container">
  <div className="full-screen-image">
    <h1 style={{ margin: '2rem' }}>To My Sweetheart (Ma)💖</h1>
    <p style={{ margin: '2rem' }}>
      From the moment I met you, my world became brighter. <br />
      Your smile lights up even my darkest days, and your presence is the
      calm in my chaos. <br />
      Every heartbeat whispers your name, and every star reminds me of your
      beauty. <br /><br />
      You're not just my crush — you're my favorite thought, my quiet hope,
      and my little forever. 💫
    </p>
    <p style={{ margin: '2rem' }}>— With all my heart (Shine) 💗</p>
  </div>
</div>
      )}

      {/* Black screen fade */}
      {/* {screenBlack && <div className="black-screen" />} */}
    </>
  );
}

export default App;
