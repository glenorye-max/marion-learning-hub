import React, { useState, useEffect } from 'react';
import { User, OnlineClass, TimetableEntry, Announcement, AttendanceRecord, Homework, SubordinateStaff } from '../types';
import { INITIAL_TIMETABLE, INITIAL_ANNOUNCEMENTS, INITIAL_STUDENTS, INITIAL_HOMEWORK, INITIAL_SUBORDINATE_STAFF, DEFAULT_HOME_BG, KENYAN_GRADES } from './mockData';
import { toast } from 'sonner';

export const useLMS = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('lms_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [timetable, setTimetable] = useState<TimetableEntry[]>(() => {
    const saved = localStorage.getItem('lms_timetable');
    return saved ? JSON.parse(saved) : INITIAL_TIMETABLE;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('lms_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [students, setStudents] = useState<User[]>(() => {
    const saved = localStorage.getItem('lms_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [subordinateStaff, setSubordinateStaff] = useState<SubordinateStaff[]>(() => {
    const saved = localStorage.getItem('lms_subordinate_staff');
    return saved ? JSON.parse(saved) : INITIAL_SUBORDINATE_STAFF;
  });

  const [homework, setHomework] = useState<Homework[]>(() => {
    const saved = localStorage.getItem('lms_homework');
    return saved ? JSON.parse(saved) : INITIAL_HOMEWORK;
  });

  const [homeBgUrl, setHomeBgUrl] = useState<string>(() => {
    return localStorage.getItem('lms_home_bg') || DEFAULT_HOME_BG;
  });

  const [activeClasses, setActiveClasses] = useState<OnlineClass[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('lms_attendance');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('lms_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('lms_timetable', JSON.stringify(timetable));
  }, [timetable]);

  useEffect(() => {
    localStorage.setItem('lms_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('lms_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('lms_subordinate_staff', JSON.stringify(subordinateStaff));
  }, [subordinateStaff]);

  useEffect(() => {
    localStorage.setItem('lms_homework', JSON.stringify(homework));
  }, [homework]);

  useEffect(() => {
    localStorage.setItem('lms_home_bg', homeBgUrl);
  }, [homeBgUrl]);

  useEffect(() => {
    localStorage.setItem('lms_attendance', JSON.stringify(attendance));
  }, [attendance]);

  const login = (userData: User) => {
    setUser(userData);
    if (userData.role === 'student') {
        setStudents(prev => {
            if (prev.find(s => s.id === userData.id)) return prev;
            return [...prev, userData];
        });
    }
    if (userData.role === 'subordinate') {
        setSubordinateStaff(prev => {
            if (prev.find(s => s.id === userData.id)) return prev;
            const newStaff: SubordinateStaff = {
                id: userData.id,
                fullName: userData.fullName,
                areaOfWork: userData.areaOfWork || 'General',
                idNumber: userData.idNumber || 'N/A',
                registeredDate: new Date().toISOString().split('T')[0]
            };
            return [...prev, newStaff];
        });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lms_user');
  };

  const addTimetableEntry = (entry: TimetableEntry) => {
    setTimetable(prev => [...prev, entry]);
  };

  const addAnnouncement = (ann: Announcement) => {
    setAnnouncements(prev => [ann, ...prev]);
    toast.success("Announcement posted successfully!");
  };

  const postHomework = (content: string, imageUrl: string | undefined, grade: string) => {
    if (!user) return;
    const newHomework: Homework = {
      id: Math.random().toString(36).substr(2, 9),
      content,
      imageUrl,
      grade,
      teacherId: user.id,
      teacherName: user.fullName,
      timestamp: new Date().toISOString()
    };
    setHomework(prev => [newHomework, ...prev]);
    toast.success("Homework posted successfully!");
  };

  const upgradeGrades = () => {
    setStudents(prev => prev.map(student => {
      if (!student.grade) return student;
      const currentIndex = KENYAN_GRADES.indexOf(student.grade);
      if (currentIndex !== -1 && currentIndex < KENYAN_GRADES.length - 1) {
        return {
          ...student,
          grade: KENYAN_GRADES[currentIndex + 1]
        };
      }
      return student;
    }));
    toast.success("All students have been upgraded to the next grade!");
  };

  const updateHomeBg = (url: string) => {
    setHomeBgUrl(url);
    toast.success("Homepage background updated!");
  };

  const addSubordinateStaffMember = (staff: SubordinateStaff) => {
    setSubordinateStaff(prev => [...prev, staff]);
    toast.success("Subordinate staff member added!");
  };

  const createClass = (subject: string, teacherId: string) => {
    const newClass: OnlineClass = {
      id: Math.random().toString(36).substr(2, 9),
      subject,
      teacherId,
      startTime: new Date().toISOString(),
      isActive: true,
      participants: [],
      permissions: {}
    };
    setActiveClasses(prev => [...prev, newClass]);
    return newClass.id;
  };

  const updatePermissions = (classId: string, studentId: string, type: 'mic' | 'screenShare', value: boolean) => {
    setActiveClasses(prev => prev.map(c => {
      if (c.id === classId) {
        return {
          ...c,
          permissions: {
            ...c.permissions,
            [studentId]: {
              ...(c.permissions[studentId] || { mic: false, screenShare: false }),
              [type]: value
            }
          }
        };
      }
      return c;
    }));
  };

  const recordAttendance = (record: AttendanceRecord) => {
    setAttendance(prev => [...prev, record]);
  };

  return {
    user,
    setUser,
    login,
    logout,
    timetable,
    addTimetableEntry,
    announcements,
    addAnnouncement,
    activeClasses,
    setActiveClasses,
    createClass,
    updatePermissions,
    attendance,
    recordAttendance,
    students,
    subordinateStaff,
    homework,
    homeBgUrl,
    postHomework,
    upgradeGrades,
    updateHomeBg,
    addSubordinateStaffMember
  };
};