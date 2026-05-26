import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useLMS } from './lib/store';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Dashboards } from './pages/Dashboards';
import { Announcements } from './pages/Announcements';
import { VirtualClass } from './components/Classroom';

function App() {
  const lms = useLMS();
  const [activeClassId, setActiveClassId] = useState<string | null>(null);
  const [activeSubject, setActiveSubject] = useState('');

  const handleStartClass = (subject: string) => {
    const id = lms.createClass(subject, lms.user?.id || 'anon');
    setActiveClassId(id);
    setActiveSubject(subject);
  };

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navigation user={lms.user} onLogout={lms.logout} />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={lms.user ? <Navigate to="/dashboard" /> : <Login onLogin={lms.login} />} 
            />
            <Route 
              path="/dashboard" 
              element={
                lms.user ? (
                  <Dashboards 
                    user={lms.user} 
                    timetable={lms.timetable}
                    onAddTimetable={lms.addTimetableEntry}
                    onAddAnnouncement={lms.addAnnouncement}
                    onCreateClass={handleStartClass}
                    attendance={lms.attendance}
                    students={lms.students}
                    subordinateStaff={lms.subordinateStaff}
                    homework={lms.homework}
                    homeBgUrl={lms.homeBgUrl}
                    onPostHomework={lms.postHomework}
                    onUpgradeGrades={lms.upgradeGrades}
                    onUpdateHomeBg={lms.updateHomeBg}
                    onAddSubordinate={lms.addSubordinateStaffMember}
                    announcements={lms.announcements}
                  />
                ) : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/announcements" 
              element={<Announcements announcements={lms.announcements} />} 
            />
          </Routes>
        </main>

        {activeClassId && (
          <VirtualClass 
            classId={activeClassId} 
            user={lms.user} 
            subject={activeSubject}
            onExit={() => setActiveClassId(null)}
            updatePermissions={(sid, type, val) => lms.updatePermissions(activeClassId, sid, type, val)}
            initialPermissions={lms.activeClasses.find(c => c.id === activeClassId)?.permissions}
          />
        )}

        <Toaster position="top-center" richColors />
      </div>
    </Router>
  );
}

export default App;