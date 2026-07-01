import React, { useState, useEffect } from "react";

import {
    FileSearch,
    Target,
    Sparkles,
    Download,
    CheckCircle2,
    Bot,
    Brain,
    ListChecks
} from "lucide-react";
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview.js'
import { useParams } from 'react-router'



const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [ open, setOpen ] = useState(false)
    return (
        <div className='q-card'>
            <div className='q-card__header' onClick={() => setOpen(o => !o)}>
                <span className='q-card__index'>Q{index + 1}</span>
                <p className='q-card__question'>{item.question}</p>
                <span className={`q-card__chevron ${open ? 'q-card__chevron--open' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className='q-card__body'>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--intention'>Intention</span>
                        <p>{item.intention}</p>
                    </div>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--answer'>Model Answer</span>
                        <p>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='roadmap-day'>
        <div className='roadmap-day__header'>
            <span className='roadmap-day__badge'>Day {day.day}</span>
            <h3 className='roadmap-day__focus'>{day.focus}</h3>
        </div>
        <ul className='roadmap-day__tasks'>
            {day.tasks.map((task, i) => (
                <li key={i}>
                    <span className='roadmap-day__bullet' />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [resumeLoading, setResumeLoading] = useState(false);
const [resumeStep, setResumeStep] = useState(1);
    const [ activeNav, setActiveNav ] = useState('technical')
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()
    useEffect(() => {

    if (!resumeLoading) {
        setResumeStep(1);
        return;
    }

    const t1 = setTimeout(() => setResumeStep(2), 1200);
    const t2 = setTimeout(() => setResumeStep(3), 2400);
    const t3 = setTimeout(() => setResumeStep(4), 3600);
  const t4 = setTimeout(() => setResumeStep(5), 4500);

    return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
    };

}, [resumeLoading]);

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [ interviewId ])



     const progress =
    resumeStep === 1 ? 20 :
    resumeStep === 2 ? 45 :
    resumeStep === 3 ? 70 :
    resumeStep === 4 ? 95:
    100;
    if (resumeLoading) {

    return (

    <main className="resume-loading-screen">

    <div className="resume-card">

       <div className="resume-logo">
    <Bot size={32} strokeWidth={2.2} />
    <span>HireSense AI</span>
</div>

    <h2>
    <Brain size={32} style={{ marginRight: "10px", verticalAlign: "middle" }} />
    Creating Your ATS Resume
</h2>

       <p className="resume-subtitle">
    AI is analyzing your interview report and building an ATS-friendly resume.
</p>

   <div className="resume-progress">

    <div
        className="resume-progress-fill"
        style={{
            width: `${progress}%`
        }}
    />

</div>

<div className="resume-progress-text">
    {resumeStep === 5
        ? "Almost Done..."
        : `${progress}% Completed`}
</div>
<div className="resume-steps">

            <div className={`resume-step ${
    resumeStep===1
        ? "active"
        : resumeStep>1
        ? "done"
        : ""
      }`}
      >
            <span>
{
resumeStep>1
?
<CheckCircle2 size={24}/>
:
<FileSearch size={24}/>
}
</span>

                <div>
                   <h4>Reading Interview Report</h4>
 
                     <p>Analyzing your interview insights...</p>
                </div>
            </div>

            <div
className={`resume-step ${
    resumeStep===2
        ? "active"
        : resumeStep>2
        ? "done"
        : ""
}`}
>
            <span>
{
resumeStep>2
?
<CheckCircle2 size={24}/>
:
<Target size={24}/>
}
</span>

                <div>
                  <h4>Optimizing ATS Keywords</h4>

                   <p>Matching skills with job description...</p>
                </div>
            </div>
<div className={`resume-step ${
    resumeStep===3 ? "active" : resumeStep>3 ? "done" : ""
}`}>
    <span>
        {
            resumeStep > 3
            ? <CheckCircle2 size={24}/>
            : <Sparkles size={24}/>
        }
    </span>

    <div>
       <h4>Writing Professional Resume</h4>

          <p>Creating an ATS-friendly resume layout...</p>
    </div>
</div>

           <div className={`resume-step ${
    resumeStep===4 ? "active" : resumeStep>4 ? "done" : ""
}`}>
    <span>
        {
            resumeStep > 4
            ? <CheckCircle2 size={24}/>
            : <FileSearch size={24}/>
        }
    </span>

    <div>
      <h4>Generating PDF</h4>

         <p>Preparing your final downloadable resume...</p>
    </div>
</div>
<div
className={`resume-step ${
    resumeStep===5
        ? "active"
        : resumeStep>5
        ? "done"
        : ""
}`}
>
              <span>
<Download size={24}/>
</span>

                <div>
                   <h4>Finalizing Resume</h4>

                   <p>Your resume is almost ready...</p>
                </div>
            </div>

        </div>

     <small>
This usually takes 10–20 seconds. Please don't close this page.
</small>

    </div>

</main>

    )

}
const interviewProgress =
    !report ? 35 : 100;

if (loading || !report) {
    return (
        <main className="interview-loading-screen">

            <div className="interview-loading-card">

                <div className="loading-robot">
                    <Bot size={70} />
                </div>

                <h2>
                    Loading <span>Interview Report</span>
                </h2>

                <p>
                    Retrieving your personalized interview analysis...
                </p>

                <div className="interview-progress">
                    <div
                        className="interview-progress-fill"
                        style={{ width: `${interviewProgress}%` }}
                    />
                </div>

                <div className="interview-loading-steps">

                    <div className="interview-step done">
                        <span>
                            <CheckCircle2 size={22} />
                        </span>

                        <div>
                            <h4>Fetching Report</h4>
                            <p>Retrieving your interview data</p>
                        </div>
                    </div>

                    <div className="interview-step active">
                        <span>
                            <Brain size={22} />
                        </span>

                        <div>
                            <h4>Preparing Analysis</h4>
                            <p>Analyzing your performance</p>
                        </div>
                    </div>

                    <div className="interview-step">
                        <span>
                            <Sparkles size={22} />
                        </span>

                        <div>
                            <h4>Rendering Dashboard</h4>
                            <p>Building your personalized report</p>
                        </div>
                    </div>

                </div>

                <div className="loading-tip">
                    💡 Tip: Great preparation today leads to success tomorrow.
                </div>

            </div>

        </main>
    );
}

   const score = report.matchScore;

const scoreColor =
    score >= 80 ? "score--high" :
    score >= 60 ? "score--mid" :
    "score--low";

let matchText = "";

if (score >= 80) {
    matchText = "Excellent match for this role";
} else if (score >= 60) {
    matchText = "Good match for this role";
} else if (score >= 40) {
    matchText = "Average match for this role";
} else {
    matchText = "Needs improvement";
}


    return (
        <div className='interview-page'>
            <div className='interview-layout'>

                {/* ── Left Nav ── */}
                <nav className='interview-nav'>
                    <div className="nav-content">
                        <p className='interview-nav__label'>Sections</p>
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                className={`interview-nav__item ${activeNav === item.id ? 'interview-nav__item--active' : ''}`}
                                onClick={() => setActiveNav(item.id)}
                            >
                                <span className='interview-nav__icon'>{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                           </div>  
                    <button
    className="button primary-button"
    onClick={async () => {

        try {

            setResumeLoading(true);

            const start = Date.now();

            await getResumePdf(interviewId);

            const elapsed = Date.now() - start;

           if (elapsed < 6000) {
    await new Promise(resolve =>
        setTimeout(resolve, 6000 - elapsed)
    );
}

        } finally {

            setResumeLoading(false);

        }

    }}
>
    <svg
        height="0.8rem"
        style={{ marginRight: "0.8rem" }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956Z"></path>
    </svg>

    Download Resume
</button>
                </nav>

                <div className='interview-divider' />

                {/* ── Center Content ── */}
                <main className='interview-content'>
                   {activeNav === 'technical' && (
    <section>

        <div className="content-header">

            <h2>Technical Questions</h2>

            <span className="content-header__count">
                <ListChecks size={16} className="count-icon" />
                <span className="count-text">
                    {report.technicalQuestions.length} Questions
                </span>
            </span>

        </div>

        <div className="q-list">
            {report.technicalQuestions.map((q, i) => (
                <QuestionCard key={i} item={q} index={i} />
            ))}
        </div>

    </section>
)}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className='content-header'>
                                <h2>Behavioral Questions</h2>
                               <span className="content-header__count">
                <ListChecks size={16} className="count-icon" />
                <span className="count-text">
                    {report.technicalQuestions.length} Questions
                </span>
            </span>
                            </div>
                            <div className='q-list'>
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className='content-header'>
                                <h2>Preparation Road Map</h2>
                                <span className='content-header__count'>{report.preparationPlan.length}-day plan</span>
                            </div>
                            <div className='roadmap-list'>
                                {report.preparationPlan.map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                <div className='interview-divider' />

                {/* ── Right Sidebar ── */}
                <aside className='interview-sidebar'>

                    {/* Match Score */}
                   <div className="match-score">

    <p className="match-score__label">
        AI Match Score
    </p>

    <div className={`match-score__ring ${scoreColor}`}>
    <div className="match-score__number">
        <span className="match-score__value">{report.matchScore}</span>
        <span className="match-score__pct">%</span>
    </div>
</div>

    <h3 className="match-score__status">

        {score >= 80
            ? "Excellent"
            : score >= 60
            ? "Good"
            : "Needs Work"}

    </h3>

    <p className="match-score__sub">
        {matchText}
    </p>

</div>

                    <div className='sidebar-divider' />

                    {/* Skill Gaps */}
                    <div className='skill-gaps'>
                        <p className='skill-gaps__label'>Skill Gaps</p>
                        <div className='skill-gaps__list'>
                            {report.skillGaps.map((gap, i) => (
                                <span key={i} className={`skill-tag skill-tag--${gap.severity}`}>
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>

                </aside>
            </div>
        </div>
    )
}

export default Interview