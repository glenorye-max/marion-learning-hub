import { TimetableEntry, Announcement, User, Homework, SubordinateStaff } from '../types';

export const DEFAULT_HOME_BG = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/8f9d704a-ca23-413b-abe7-1b8ff8e9135e/school-hero-2bf44fe7-1779309864199.webp";

export const KENYAN_GRADES = [
  "Kindergarten (PP1)",
  "Kindergarten (PP2)",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9"
];

export const INITIAL_TIMETABLE: TimetableEntry[] = [
  { id: '1', day: 'Monday', time: '08:00 AM', subject: 'Mathematics', teacher: 'Mr. John Doe', grade: 'Grade 8' },
  { id: '2', day: 'Monday', time: '10:00 AM', subject: 'Science', teacher: 'Ms. Jane Smith', grade: 'Grade 8' },
  { id: '3', day: 'Tuesday', time: '09:00 AM', subject: 'English', teacher: 'Mrs. Mary Williams', grade: 'Grade 7' },
  { id: '4', day: 'Wednesday', time: '09:00 AM', subject: 'Drawing', teacher: 'Miss Alice', grade: 'Kindergarten (PP2)' },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'Inter-School Sports Day',
    content: 'Our annual sports day will be held on Friday. All students are expected to participate.',
    date: '2024-05-20',
    target: 'all',
    senderName: 'Admin',
    senderRole: 'admin'
  },
  {
    id: '2',
    title: 'Junior Secondary Assessment',
    content: 'Grade 9 students will undergo their final assessments starting next Monday.',
    date: '2024-05-22',
    target: 'students',
    senderName: 'Admin',
    senderRole: 'admin'
  },
  {
    id: '3',
    title: 'Staff Welfare Meeting',
    content: 'Urgent meeting for all teaching and non-teaching staff at 4:00 PM today.',
    date: '2024-05-24',
    target: 'staff',
    senderName: 'Principal',
    senderRole: 'admin'
  }
];

export const INITIAL_STUDENTS: User[] = [
  { id: 's1', fullName: 'Sarah Wilson', role: 'student', admissionNo: 'MP-2024-001', grade: 'Grade 8', enrollmentDate: '2024-01-01' },
  { id: 's2', fullName: 'James Kariuki', role: 'student', admissionNo: 'MP-2024-002', grade: 'Grade 8', enrollmentDate: '2024-01-01' },
  { id: 's3', fullName: 'David M.', role: 'student', admissionNo: 'MP-2023-005', grade: 'Grade 7', enrollmentDate: '2023-01-01' },
  { id: 's4', fullName: 'Lucy W.', role: 'student', admissionNo: 'MP-2023-006', grade: 'Grade 7', enrollmentDate: '2023-01-01' },
  { id: 's5', fullName: 'Baby Leo', role: 'student', admissionNo: 'MP-2024-050', grade: 'Kindergarten (PP1)', enrollmentDate: '2024-02-01' },
];

export const INITIAL_HOMEWORK: Homework[] = [
  {
    id: 'h1',
    content: 'Please solve exercises 5 to 10 on page 42 of your Math textbook.',
    grade: 'Grade 8',
    teacherId: 't1',
    teacherName: 'Mr. John Doe',
    timestamp: '2024-05-25T10:00:00Z'
  }
];

export const INITIAL_SUBORDINATE_STAFF: SubordinateStaff[] = [
  { id: 'sub1', fullName: 'Samuel Otieno', areaOfWork: 'School Bus Driver', idNumber: '23456789', registeredDate: '2024-02-15' },
  { id: 'sub2', fullName: 'Grace Mutua', areaOfWork: 'Head of Catering', idNumber: '12983476', registeredDate: '2024-03-01' },
];