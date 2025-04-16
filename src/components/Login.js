import React, { useState, useRef, useEffect } from 'react';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isDancing, setIsDancing] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const buttonRef = useRef(null);
  const formRef = useRef(null);

  // Check username validity as user types
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    
    // Check if username is valid (in this case, "user")
    if (value.length > 0) {
      setIsUsernameValid(value === 'user');
    } else {
      // Empty field is neither valid nor invalid
      setIsUsernameValid(true);
    }
  };

  // Check password validity as user types
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    // Check if password is valid (in this case, "pass")
    if (value.length > 0) {
      setIsPasswordValid(value === 'pass');
    } else {
      // Empty field is neither valid nor invalid
      setIsPasswordValid(true);
    }
  };

  // Start dancing only if both fields have content and either is incorrect
  useEffect(() => {
    // Only trigger dancing if both fields have been filled with something
    if (username.length > 0 && password.length > 0) {
      if (!isUsernameValid || !isPasswordValid) {
        setIsDancing(true);
        moveButton();
      } else {
        setIsDancing(false);
        setButtonPosition({ x: 0, y: 0 });
      }
    } else {
      // If either field is empty, no dancing
      setIsDancing(false);
      setButtonPosition({ x: 0, y: 0 });
    }
  }, [username, password, isUsernameValid, isPasswordValid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demonstration, let's assume the correct credentials are:
    // username: 'user' and password: 'pass'
    if (username === 'user' && password === 'pass') {
      setError('');
      alert('Login successful!');
      // Reset attempts and stop dancing on successful login
      setWrongAttempts(0);
      setIsDancing(false);
      setIsButtonVisible(true);
      // Reset button position
      setButtonPosition({ x: 0, y: 0 });
    } else {
      setError('Invalid username or password');
      setWrongAttempts(prev => prev + 1);
    }
  };

  const handleButtonMouseEnter = () => {
    // Only make the button "dance" if it should be dancing
    if (isDancing) {
      moveButton();
    }
  };

  const moveButton = () => {
    if (!buttonRef.current || !formRef.current) return;

    const formRect = formRef.current.getBoundingClientRect();
    
    // Set strict boundaries for button movement
    // These values create a safe area within the form container
    const buttonWidth = buttonRef.current.offsetWidth;
    const buttonHeight = buttonRef.current.offsetHeight;
    
    // Calculate max positions that keep button fully within form
    const maxX = formRect.width - buttonWidth - 40;
    const maxY = 80; // Limiting vertical movement to be more controlled
    
    // Generate new random position within strict boundaries
    const newX = Math.max(10, Math.min(Math.floor(Math.random() * maxX), maxX));
    const newY = Math.max(0, Math.min(Math.floor(Math.random() * maxY), maxY));
    
    setButtonPosition({ x: newX, y: newY });
  };

  // Add new animation hook for floating particles
  useEffect(() => {
    const createParticles = () => {
      const container = document.querySelector('.login-container');
      if (!container) return;
      
      // Remove old particles
      const oldParticles = document.querySelectorAll('.particle');
      oldParticles.forEach(particle => particle.remove());
      
      // Create new particles
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = `${Math.random() * 10 + 5}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.opacity = Math.random() * 0.6 + 0.4;
        particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        container.appendChild(particle);
      }
    };
    
    createParticles();
    return () => {
      const particles = document.querySelectorAll('.particle');
      particles.forEach(particle => particle.remove());
    };
  }, []);

  // Enhanced background animation elements
  useEffect(() => {
    // Create dynamic particles
    const createParticles = () => {
      const particlesContainer = document.querySelector('.particles');
      if (!particlesContainer) return;
      
      particlesContainer.innerHTML = '';
      
      // Create floating dots
      for (let i = 0; i < 80; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Randomize particle properties
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Add depth with different opacities and animations
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
      }
    };
    
    createParticles();
    
    return () => {
      const particlesContainer = document.querySelector('.particles');
      if (particlesContainer) {
        particlesContainer.innerHTML = '';
      }
    };
  }, []);

  // Add new animation hook for stars background
  useEffect(() => {
    const createStars = () => {
      const starsContainer = document.querySelector('.stars-container');
      if (!starsContainer) return;
      
      // Clear any existing stars
      starsContainer.innerHTML = '';
      
      // Create new stars
      for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 20}s`;
        starsContainer.appendChild(star);
      }
    };
    
    createStars();
    
    return () => {
      const starsContainer = document.querySelector('.stars-container');
      if (starsContainer) {
        starsContainer.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="login-container">
      {/* Enhanced background elements */}
      <div className="background-animation"></div>
      <div className="light-beam"></div>
      <div className="color-overlay"></div>
      <div className="particles"></div>
      <div className="stars-container"></div>
      <div className="nebula"></div>
      
      <form className="login-form" onSubmit={handleSubmit} ref={formRef}>
        {/* Decorative elements */}
        <div className="form-decoration decoration-1"></div>
        <div className="form-decoration decoration-2"></div>
        
        <h2>Welcome</h2>
        
        {error && (
          <div className="error-message">
            <span>!</span> {error}
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className={username.length > 0 && !isUsernameValid ? 'invalid' : ''}
            placeholder="Enter your username"
            required
          />
          {username.length > 0 && !isUsernameValid && 
            <div className="field-feedback">Username not recognized</div>
          }
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className={password.length > 0 && !isPasswordValid ? 'invalid' : ''}
            placeholder="Enter your password"
            required
          />
          {password.length > 0 && !isPasswordValid && 
            <div className="field-feedback">Incorrect password</div>
          }
        </div>
        
        <div className="button-container">
          {isButtonVisible && (
            <button
              ref={buttonRef}
              type="submit"
              className={`login-button ${isDancing ? 'dancing' : ''}`}
              onMouseEnter={handleButtonMouseEnter}
              style={isDancing ? {
                transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px) scale(1.03)`,
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                position: 'absolute'
              } : {}}
            >
              <span>Sign In</span>
            </button>
          )}
        </div>
        
        {wrongAttempts > 0 && (
          <p className="hint">
            <span>💡</span> Demo credentials: username "user" / password "pass"
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
