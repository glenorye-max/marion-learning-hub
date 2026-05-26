export type UserRole = 'admin' | 'staff' | 'student' | 'subordinate' | 'parent';

export interface User {
  id: string;
  role: UserRole;
  fullName: string;
  email?: string;
  admissionNo?: string;
  grade?: string;
  subjects?: string[];
  enrollmentDate?: string;
  areaOfWork?: string;
  idNumber?: string;
  childAdmissionNo?: string; // For parents
}

export interface TimetableEntry {
  id: string;
  day: string;
  time: string;
  subject: string;
  teacher: string;
  grade: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  target: 'all' | 'students' | 'parents' | 'staff' | 'teachers';
  senderName: string;
  senderRole: UserRole;
}

export interface AttendanceRecord {
  studentId: string;
  classId: string;
  date: string;
  joinedAt: string;
  leftAt?: string;
  durationMinutes: number;
  totalClassMinutes: number;
}

export interface OnlineClass {
  id: string;
  subject: string;
  teacherId: string;
  startTime: string;
  isActive: boolean;
  participants: string[]; // User IDs
  permissions: {
    [studentId: string]: {
      mic: boolean;
      screenShare: boolean;
    }
  };
}

export interface Homework {
  id: string;
  content: string;
  imageUrl?: string;
  grade: string;
  teacherId: string;
  teacherName: string;
  timestamp: string;
}

export interface SubordinateStaff {
  id: string;
  fullName: string;
  areaOfWork: string;
  idNumber: string;
  registeredDate: string;
}