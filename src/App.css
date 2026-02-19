import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, BrainCircuit, TrendingUp, Send, Bot, 
  Activity, Zap, Target, Calculator, RefreshCw, 
  Search, Bell, Settings, BookOpen, CheckCircle
} from 'lucide-react';
import './App.css';

const App = () => {
  // --- NAVIGATION STATE ---
  const [activeTab, setActiveTab] = useState('dashboard');

  // --- AI INPUT STATES (Global) ---
  const [attendance, setAttendance] = useState(85);
  const [studyHours, setStudyHours] = useState(6);
  const [assignments, setAssignments] = useState(90);
  const [syllabus, setSyllabus] = useState(70);
  const [prediction, setPrediction] = useState(8.82);
  const [isComputing, setIsComputing] = useState(false);

  // --- NEW: DYNAMIC COURSE DATA STATE ---
  // This allows you to set study hours for EACH course individually
  const [courseData, setCourseData] = useState([
    { id: 1, name: "Data Structures", code: "CS-201", att: 90, study: 5, risk: "Low", prob: 92 },
    { id: 2, name: "Database Systems", code: "CS-204", att: 45, study: 2, risk: "High", prob: 45 },
    { id: 3, name: "Operating Systems", code: "CS-202", att: 75, study: 4, risk: "Medium", prob: 68 },
    { id: 4, name: "Linear Algebra", code: "MA-102", att: 95, study: 6, risk: "Low", prob: 95 }
  ]);

  // Function to calculate individual course risk based on your inputs
  const updateCourse = (id, field, value) => {
    const val = Number(value);
    setCourseData(prev => prev.map(c => {
      if (c.id === id) {
        const updatedCourse = { ...c, [field]: val };
        // AI Logic: Weighting attendance and study hours
        const newProb = Math.min(100, (updatedCourse.att * 0.4) + (updatedCourse.study * 10));
        let newRisk = "High";
        if (newProb > 80) newRisk = "Low";
        else if (newProb > 60) newRisk = "Medium";
        
        return { ...updatedCourse, prob: Math.round(newProb), risk: newRisk };
      }
      return c;
    }));
  };

  // --- SEARCH LOGIC ---
  const [searchQuery, setSearchQuery] = useState("");
  const filteredCourses = courseData.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- CHAT LOGIC ---
  const [messages, setMessages] = useState([{ type: 'bot', text: "Systems active. Enter your metrics to update the prediction engine." }]);
  const [chatInput, setChatInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  // --- THE BRAIN: AI CALCULATION ---
  const handlePrediction = () => {
    setIsComputing(true);
    setTimeout(() => {
      const score = ((attendance * 0.2) + (studyHours * 1.5) + (assignments * 0.3) + (syllabus * 0.1)) / 10;
      const finalGpa = Math.min(10, score).toFixed(2);
      setPrediction(finalGpa);
      setIsComputing(false);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: `Update: Based on ${syllabus}% syllabus completion, your projected CGPA is now ${finalGpa}.` 
      }]);
    }, 1000);
  };

  const sendChat = (e) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages([...messages, { type: 'user', text: chatInput }]);
    setChatInput("");
    setTimeout(() => {
      const response = "Pattern recognition suggests your study habits for " + courseData[0].name + " are improving your probability.";
      setMessages(prev => [...prev, { type: 'bot', text: response }]);
    }, 800);
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="brand">
          <BrainCircuit color="#3b82f6" size={28}/>
          <h3>FUTURE MINDS</h3>
        </div>
        <nav className="menu">
          <div className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={20}/> Dashboard
          </div>
          <div className={`menu-item ${activeTab === 'predictions' ? 'active' : ''}`} onClick={() => setActiveTab('predictions')}>
            <TrendingUp size={20}/> Predictions
          </div>
        </nav>
        <div className="user-profile">
          <div className="avatar">GS</div>
          <div><p>Gokul Saud</p><span>Lead Developer</span></div>
        </div>
      </aside>

      <main className="viewport">
        <header className="navbar">
          <div className="search-engine">
            <Search size={18} color="#94a3b8"/>
            <input 
              placeholder="Search courses..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="nav-actions">
            <div className="icon-badge"><Bell size={20}/><span className="dot"></span></div>
            <Settings size={20} className="clickable"/>
          </div>
        </header>

        <div className="scroll-box">
          {activeTab === 'dashboard' ? (
            <div className="dashboard-view">
              <section className="top-stats">
                <div className="card gpa-card">
                  <Target size={32}/>
                  <div>
                    <h2>{prediction}</h2>
                    <p>Projected CGPA</p>
                  </div>
                </div>
                <div className="card stat-card">
                  <Activity size={24} color="#3b82f6"/>
                  <h3>{attendance}%</h3>
                  <p>Attendance</p>
                </div>
              </section>

              <section className="course-matrix">
                <div className="card">
                  <h3>Interactive Course Success Matrix</h3>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Course</th>
                        <th>Att %</th>
                        <th>Study Hrs</th>
                        <th>Prob %</th>
                        <th>Risk</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCourses.map(c => (
                        <tr key={c.id}>
                          <td><strong>{c.name}</strong></td>
                          <td>
                            <input 
                                className="table-input" 
                                type="number" 
                                value={c.att} 
                                onChange={(e) => updateCourse(c.id, 'att', e.target.value)} 
                            />
                          </td>
                          <td>
                            <input 
                                className="table-input" 
                                type="number" 
                                value={c.study} 
                                onChange={(e) => updateCourse(c.id, 'study', e.target.value)} 
                            />
                          </td>
                          <td style={{fontWeight: 'bold', color: '#3b82f6'}}>{c.prob}%</td>
                          <td><span className={`tag ${c.risk}`}>{c.risk}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          ) : (
            /* PREDICTIONS TAB REMAINS EXACTLY SAME AS YOUR CODE */
            <div className="prediction-view">
              <div className="card ai-input-card">
                <div className="card-header"><Calculator color="#3b82f6"/> <h2>AI Inference Parameters</h2></div>
                <div className="input-grid">
                  <div className="field">
                    <label>Attendance ({attendance}%)</label>
                    <input type="range" value={attendance} onChange={(e)=>setAttendance(e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Study Hours ({studyHours}h)</label>
                    <input type="range" max="15" value={studyHours} onChange={(e)=>setStudyHours(e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Assignment Avg ({assignments}%)</label>
                    <input type="number" value={assignments} onChange={(e)=>setAssignments(e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Syllabus Completion ({syllabus}%)</label>
                    <input type="number" value={syllabus} onChange={(e)=>setSyllabus(e.target.value)} />
                  </div>
                </div>
                <button className="primary-btn" onClick={handlePrediction} disabled={isComputing}>
                  {isComputing ? <RefreshCw className="spin"/> : <Zap/>}
                  {isComputing ? "Analyzing Patterns..." : "RUN AI PREDICTION"}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <aside className="ai-sidebar">
        <div className="assistant-head"><Bot size={20}/> EduPredict Assistant</div>
        <div className="chat-area">
          {messages.map((m, i) => <div key={i} className={`bubble ${m.type}`}>{m.text}</div>)}
          <div ref={scrollRef} />
        </div>
        <form className="chat-input-bar" onSubmit={sendChat}>
          <input placeholder="Ask about GPA..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} />
          <button type="submit"><Send size={18}/></button>
        </form>
      </aside>
    </div>
  );
};

export default App;
