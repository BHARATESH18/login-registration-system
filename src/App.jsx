import { useState } from "react";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://localhost:5000/api/login"
      : "http://localhost:5000/api/register";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);

        if (!isLogin) {
          setIsLogin(true);
          setFormData({
            name: "",
            email: "",
            password: "",
          });
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Cannot connect to backend server.");
      console.error(error);
    }
  };

  return (
    <div className="page">

      {/* Animated background */}
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>

      <div className="auth-container">

        {/* Left section */}
        <div className="welcome-section">
          <div className="logo">◆</div>

          <h1>Welcome Back!</h1>

          <p>
            Secure authentication made simple.
            <br />
            Login or create your account to continue.
          </p>

          <div className="features">
            <div>✓ Secure Authentication</div>
            <div>✓ Password Protection</div>
            <div>✓ MongoDB Database</div>
          </div>
        </div>

        {/* Right section */}
        <div className="form-section">

          <div className="form-header">
            <h2>{isLogin ? "Login" : "Create Account"}</h2>

            <p>
              {isLogin
                ? "Enter your details to access your account"
                : "Fill in your details to create an account"}
            </p>
          </div>

          {/* Login / Register buttons */}
          <div className="tabs">
            <button
              className={isLogin ? "tab active" : "tab"}
              onClick={() => setIsLogin(true)}
              type="button"
            >
              Login
            </button>

            <button
              className={!isLogin ? "tab active" : "tab"}
              onClick={() => setIsLogin(false)}
              type="button"
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Name only for registration */}
            {!isLogin && (
              <div className="input-group">
                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="input-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <div className="password-box">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="options">
                <label className="remember">
                  <input type="checkbox" />
                  Remember me
                </label>

                <button type="button" className="forgot">
                  Forgot Password?
                </button>
              </div>
            )}

            <button className="submit-btn" type="submit">
              {isLogin ? "Login" : "Create Account"}
            </button>

          </form>

          <div className="bottom-text">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? " Register" : " Login"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;