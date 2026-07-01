import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

import {
    User,
    Mail,
    Lock,
    Bot,
    CheckCircle2,
    Eye,
    EyeOff
} from "lucide-react";

import "../auth.form.scss";
import { useAuth } from "../hooks/useAuth";

const FEATURES = [
  "Resume & Profile Analysis",
  "ATS Match Score",
  "Skill Gap Analysis",
  "Technical Interview Questions",
  "Behavioral Interview Questions",
  "Personalized Preparation Roadmap",
  "ATS-Optimized Resume PDF"
];

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const {loading,handleRegister} = useAuth()
    
 const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await handleRegister({
        username,
        email,
        password,
    });

    if(success){
        navigate("/");
    }
};

    
     return (
        <main className="auth-page">
    
          {/* LEFT PANEL */}
    
          <section className="auth-left">
    
            <div className="auth-left__content">
    
          <div className="auth-logo">
    
        <Bot size={34} className="auth-logo__icon"/>
    
        <span>HireSense AI</span>
    
               </div>
    
             <h1>
    
        Your AI Interview
    
        <span>Companion</span>
    
    </h1>
    
           <p className="hero-description">
    
   Analyze your resume, match it with any job description, identify skill gaps, prepare smarter with AI-generated interview questions, and download an ATS-optimized resume.
    
    </p>
    
              <div className="feature-list">
    
                {FEATURES.map((item) => (
                  <div key={item} className="feature-item">
                    <CheckCircle2
                    size={18}
                  className="feature-icon"
             />   
                    <span>{item}</span>
                  </div>
    
                ))}
    
              </div>
              <div className="hero-footer">
    
             Helping you prepare smarter and
        <br/>
                crack interviews with confidence.
    
    </div>
    
            </div>
    
          </section>
    
          {/* RIGHT PANEL */}
    
          <section className="auth-right">
    
            <div className="form-container">
    
             <h2>Create Account 🚀</h2>
    
            <p className="subtitle">
    Create your account to start AI-powered interview preparation.
</p>
             <form onSubmit={handleSubmit}>

    <div className="input-group">

        <label>Username</label>

        <div className="input-box">

            <User size={18} />

            <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

        </div>

    </div>
                
    
                <div className="input-group">
          
        <label>Email</label>
    
        <div className="input-box">
    
            <Mail size={18} />
    
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
    
        </div>
    
    </div>
    <div className="input-group">
    
        <label>Password</label>
    
        <div className="input-box">
    
            <Lock size={18} />
    
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
    
            <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
            >
                {
                    showPassword
                        ? <EyeOff size={18}/>
                        : <Eye size={18}/>
                }
            </button>
    
        </div>
    
    </div>  
    
               
                <button
                  className="button primary-button"
                  disabled={loading}
                >
                {loading ? "Creating Account..." : "Register"}
                </button>
    
              </form>
    
              <p className="bottom-text">
              Already have an account?
                <Link to="/login">
                     Login
                </Link>
              </p>
    
            </div>
    
          </section>
    
        </main>
      );
}

export default Register