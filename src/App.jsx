import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, BrainCircuit, TrendingUp, Send, Bot, 
  Activity, Zap, Target, Calculator, RefreshCw, 
  Search, Bell, Settings, BookOpen, CheckCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [attendance, setAttendance] = useState(85);
  const [studyHours, setStudyHours] = useState(6);
  const [syllabus, setSyllabus] = useState(70);
  const [prediction, setPrediction] = useState(8.82);
  const [isComputing, setIsComputing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [courseData, setCourseData] = useState([
    { id: 1, name: "Data Structures", code: "CS-201", att: 90, study: 5, risk: "Low", prob: 92 },
    { id: 2, name: "Database Systems", code: "CS-204", att: 45, study: 2, risk: "High", prob: 45 },
    { id: 3, name: "Operating Systems", code: "CS-202", att: 75, study: 4, risk: "Medium", prob: 68 },
    { id: 4, name: "Linear Algebra", code: "MA-102", att: 95, study: 6, risk: "Low", prob: 95 }
  ]);

  const updateCourse = (id, field, value) => {
    const val = Number(value);
    setCourseData(prev => prev.map(c => {
      if (c.id === id) {
        const updatedCourse = { ...c, [field]: val };
        const newProb = Math.min(100, (updatedCourse.att * 0.4) + (updatedCourse.study * 10));
        let newRisk = "High";
        if (newProb > 80) newRisk = "Low";
        else if (newProb > 60) newRisk = "Medium";
        return { ...updatedCourse, prob: Math.round(newProb), risk: newRisk };
      }
      return c;
    }));
  };

  // --- REAL-TIME AI ADVISOR BRAIN ---
  const [messages, setMessages] = useState([{ 
    type: 'bot', 
    text: "Core Engine Active. I've analyzed your academic streams. Database Systems is currently your high-risk point. Ask me for a plan to fix it." 
  }]);
  const [chatInput, setChatInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendChat = (e) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const query = chatInput.toLowerCase();
    setMessages(prev => [...prev, { type: 'user', text: chatInput }]);
    setChatInput("");

    // Simulate AI "Thinking" and data scanning
    setTimeout(() => {
      const weakest = [...courseData].sort((a, b) => a.prob - b.prob)[0];
      let response = "";
      
      if (query.includes("study") || query.includes("plan") || query.includes("how")) {
        response = `STRATEGIC ADVICE: Focus on ${weakest.name}. Its success probability is only ${weakest.prob}%. You need 3 additional hours of weekly prep and 80% attendance to move to 'Safe' status.`;
      } else if (query.includes("gpa") || query.includes("prediction")) {
        response = `Current CGPA projection: ${prediction}. By increasing your study velocity to 8 hours daily, we predict a jump to ${Math.min(10, parseFloat(prediction) + 0.4).toFixed(2)}.`;
      } else if (query.includes("attendance")) {
        response = `Alert: Your attendance in ${weakest.name} is ${weakest.att}%. You cannot afford to miss any more classes this week without dropping into 'Critical Risk'.`;
      } else {
        response = "I am monitoring 4 modules. The data indicates a 78% overall success probability. Check the matrix for per-course risks.";
      }

      setMessages(prev => [...prev, { type: 'bot', text: response }]);
    }, 1000);
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
            <input placeholder="Search metrics..." onChange={(e) => setSearchQuery(e.target.value)} />
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
                  <div><h2>{prediction}</h2><p>Projected CGPA</p></div>
                </div>
                
                <div className="card chart-card">
                  <div className="chart-header">
                    <Activity size={18} color="#3b82f6"/>
                    <span>Real-time Attendance Index</span>
                  </div>
                  <div style={{ width: '100%', height: 120 }}>
                    <ResponsiveContainer>
                      <BarChart data={courseData}>
                        <XAxis dataKey="code" hide />
                        <Tooltip 
                           contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey="att" radius={[4, 4, 0, 0]}>
                          {courseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.att < 75 ? '#ef4444' : '#3b82f6'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </section>

              <section className="course-matrix">
                <div className="card">
                  <h3>Interactive Success Matrix</h3>
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
                      {courseData.map(c => (
                        <tr key={c.id}>
                          <td><strong>{c.name}</strong></td>
                          <td>
                            <input className="table-input" type="number" value={c.att} 
                              onChange={(e) => updateCourse(c.id, 'att', e.target.value)} />
                          </td>
                          <td>
                            <input className="table-input" type="number" value={c.study} 
                              onChange={(e) => updateCourse(c.id, 'study', e.target.value)} />
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
            <div className="prediction-view">
               <div className="card ai-input-card">
                <h2>AI Inference Parameters</h2>
                <div className="input-grid">
                  <div className="field">
                    <label>Overall Attendance ({attendance}%)</label>
                    <input type="range" value={attendance} onChange={(e)=>setAttendance(e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Syllabus Completion ({syllabus}%)</label>
                    <input type="number" value={syllabus} onChange={(e)=>setSyllabus(e.target.value)} />
                  </div>
                </div>
                <button className="primary-btn" onClick={() => {
                  setIsComputing(true);
                  setTimeout(() => setIsComputing(false), 1000);
                }}>
                  {isComputing ? <RefreshCw className="spin"/> : <Zap/>} RUN AI INFERENCE
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <aside className="ai-sidebar">
        <div className="assistant-head">
            <div className="live-dot"></div>
            <Bot size={20}/> EduPredict AI Advisor
        </div>
        <div className="chat-area">
          {messages.map((m, i) => (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={i} className={`bubble ${m.type}`}>
              {m.text}
            </motion.div>
          ))}
          <div ref={scrollRef} />
        </div>
        <form className="chat-input-bar" onSubmit={sendChat}>
          <input placeholder="Ask for a study strategy..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} />
          <button type="submit"><Send size={18}/></button>
        </form>
      </aside>
    </div>
  );
};

export default App;
