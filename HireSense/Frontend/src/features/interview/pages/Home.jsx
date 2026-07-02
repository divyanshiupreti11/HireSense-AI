
import React, { useState, useRef, useEffect } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import {
    FileSearch,
    Target,
    Brain,
    CheckCircle2,
    Bot,
     Calendar,
  ArrowRight,
  Briefcase,
  Trophy,
   FileText,
   History
} from "lucide-react";
const Home = () => {

    const { loading, generateReport,reports } = useInterview()
    console.log("Reports:", reports);
    const [ jobDescription, setJobDescription ] = useState("")
const [selectedFile, setSelectedFile] = useState(null);
const [loadingStep, setLoadingStep] = useState(0);
    const [ selfDescription, setSelfDescription ] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()
const handleGenerateReport = async () => {

    console.log("ref =", resumeInputRef.current);

    console.log("files =", resumeInputRef.current.files);

    console.log("first file =", resumeInputRef.current.files[0]);
      const resumeFile = selectedFile;

    const data = await generateReport({
        jobDescription,
        selfDescription,
        resumeFile
    });

    navigate(`/interview/${data._id}`);
}
useEffect(() => {

    if (!loading) {
        setLoadingStep(0);
        return;
    }

    setLoadingStep(1);

    const timer1 = setTimeout(() => {
        setLoadingStep(2);
    }, 1500);

    const timer2 = setTimeout(() => {
        setLoadingStep(3);
    }, 3000);

    return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
    };

}, [loading]);

   if (loading) {
    return (
        <main className="loading-screen">

           <div className="loading-logo">

    <div className="loading-logo__icon">
        <Bot size={34}/>
    </div>

    <h1>
        HireSense AI
    </h1>

</div>

            <h2>Generating Your Interview Strategy</h2>

            <div className="progress-container">
                <div
    className="progress-bar"
    style={{
        width:
            loadingStep === 1
                ? "33%"
                : loadingStep === 2
                ? "66%"
                : "100%"
    }}
></div>
            </div>

           <div className="loading-steps">

    <div
        className={`loading-step ${
            loadingStep === 1
                ? "active"
                : loadingStep > 1
                ? "completed"
                : ""
        }`}
    >
       <span className="step-icon">
    {loadingStep > 1
        ? <CheckCircle2 size={28}/>
        : <FileSearch size={28}/>}
</span>
        <div>
            <h4>Reading Resume</h4>
            <p>Extracting skills and experience...</p>
        </div>
    </div>

    <div
        className={`loading-step ${
            loadingStep === 2
                ? "active"
                : loadingStep > 2
                ? "completed"
                : ""
        }`}
    >
       <span className="step-icon">
    {loadingStep > 2
        ? <CheckCircle2 size={28}/>
        : <Target size={28}/>}
</span>

        <div>
            <h4>Matching Job Description</h4>
            <p>Comparing your profile with requirements...</p>
        </div>
    </div>

   <div
    className={`loading-step ${
        loadingStep === 3
            ? "active"
            : loadingStep > 3
            ? "completed"
            : ""
    }`}
><span className="step-icon">
    <Brain size={28} />
</span>

        <div>
            <h4>Generating Interview Strategy</h4>
            <p>Creating personalized questions and roadmap...</p>
        </div>
    </div>

</div>

            <span>This usually takes around 20–30 seconds</span>

        </main>
    )
}

    return (
        <div className='home-page'>
            <header className="home-header">

    <div className="home-logo">

        <Bot size={30} className="home-logo__icon"/>

        <span>
            HireSense <b>AI</b>
        </span>

    </div>

</header>

            {/* Page Header */}
            <header className='page-header'>
                <h1>Create Your Custom <span className='highlight'>Interview Plan</span></h1>
                <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
               <div className="header-decoration">

    <span>📋</span>

    <div className="floating-particle particle-1"></div>
    <div className="floating-particle particle-2"></div>
    <div className="floating-particle particle-3"></div>
    <div className="floating-particle particle-4"></div>
    <div className="floating-particle particle-5"></div>

</div>
            </header>

            {/* Main Card */}
            <div className='interview-card'>
                <div className='interview-card__body'>

                    {/* Left Panel - Job Description */}
                    <div className='panel panel--left'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                            </span>
                            <h2>Target Job Description</h2>
                            <span className='badge badge--required'>Required</span>
                        </div>
                        <div className="textarea-wrapper">

    <textarea
        onChange={(e) => setJobDescription(e.target.value)}
        className="panel__textarea"
        placeholder={`Paste the full job description here...
e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
        maxLength={5000}
    />

    <div className="char-counter">
        {jobDescription.length} / 5000 chars
    </div>

</div>
                    </div>

                    {/* Vertical Divider */}
                    <div className='panel-divider' />

                    {/* Right Panel - Profile */}
                    <div className='panel panel--right'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </span>
                            <h2>Your Profile</h2>
                        </div>

                        {/* Upload Resume */}
                        <div className='upload-section'>
                            <label className='section-label'>
                                Upload Resume
                                <span className='badge badge--best'>Best Results</span>
                            </label>
                            <label className='dropzone' htmlFor='resume'>
                               
                           {selectedFile ? (
    <>
        <div className="uploaded-content">
          <div className="uploaded-icon">
    <FileText size={44}/>
</div>

            <p className="uploaded-title">
    {selectedFile?.name}
</p>

            <p className="uploaded-subtitle">
                Resume uploaded successfully
            </p>

           <span className="success-badge">
    ✓ Verified Resume
</span>
            <button
    className="change-file-btn"
    onClick={(e)=>{
        e.preventDefault();
        resumeInputRef.current.click();
    }}
>
    Change Resume
</button>
        </div>
    </>
) : (
    <>
        <span className='dropzone__icon'>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 16 12 12 8 16"/>
                <line x1="12" y1="12" x2="12" y2="21"/>
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
            </svg>
        </span>

        <p className='dropzone__title'>
            Click to upload or drag & drop
        </p>

        <p className='dropzone__subtitle'>
            PDF or DOCX (Max 5MB)
        </p>
    </>
)}
                               <input
                                ref={resumeInputRef}
                                   hidden
                                       type="file"
                                     id="resume"
                                           name="resume"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) => {
                                          if (e.target.files.length > 0) {
    setSelectedFile(e.target.files[0]);
}
                                           }}
                                      />
                            </label>
                         
                        </div>

                        {/* OR Divider */}
                        <div className='or-divider'><span>OR</span></div>

                        {/* Quick Self-Description */}
                        <div className='self-description'>
                            <label className='section-label' htmlFor='selfDescription'>Quick Self-Description</label>
                            <textarea
                                onChange={(e) => { setSelfDescription(e.target.value) }}
                                id='selfDescription'
                                name='selfDescription'
                                className='panel__textarea panel__textarea--short'
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />
                        </div>

                        {/* Info Box */}
                        <div className='info-box'>
                            <span className='info-box__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
                            </span>
                            <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                        </div>
                    </div>
                </div>

                {/* Card Footer */}
                <div className='interview-card__footer'>
                    <span className='footer-info'>AI-Powered Strategy Generation &bull; Approx 30s</span>
                    <button
                        onClick={handleGenerateReport}
                        className='generate-btn'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                        Generate My Interview Strategy
                    </button>
                </div>
            </div>
            
            
            {/* Recent Reports List */}
            {reports.length > 0 && (
             <section
    className="recent-reports"
  
>
                    <div className="reports-heading">

    <div className="reports-heading__icon">
    <History size={30}/>
</div>

    <div>

        <h2>My Recent Interview Plans</h2>

        <p>
            Track and revisit your AI generated interview strategies
        </p>

    </div>

</div>
                    <ul
    className="reports-list"
    
>
                        {reports.map(report => (
                           <li
  key={report._id}
  className="report-item"
  onClick={() => navigate(`/interview/${report._id}`)}
>
    <div className="report-header">

        <div className="report-icon">
            <Briefcase size={20}/>
        </div>

        <div className="report-info">
            <h3>{report.title || "Untitled Position"}</h3>

            <div className="report-date">
                <Calendar size={14}/>
                <span>
                    {new Date(report.createdAt).toLocaleDateString()}
                </span>
            </div>
        </div>

    </div>

    <div
        className={`score-badge ${
            report.matchScore >= 80
                ? "high"
                : report.matchScore >= 60
                ? "mid"
                : "low"
        }`}
    >
        <Trophy size={16}/>
        {report.matchScore}% Match
    </div>

    <button className="open-report-btn">
        Open Report
        <ArrowRight size={16}/>
    </button>

</li>
                        ))}
                    </ul>
                </section>
            )}

          
        </div>
    )
}

export default Home