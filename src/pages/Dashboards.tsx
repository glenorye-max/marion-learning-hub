import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
    Calendar, Plus, Users, BookOpen, AlertCircle, Video, Image as ImageIcon, 
    Send, ArrowUpCircle, Book, Settings, Truck, UserCheck, Layout, Bell, Heart, Baby
} from 'lucide-react';
import { toast } from 'sonner';

export const Dashboards: React.FC<{
  user: any;
  timetable: any[];
  onAddTimetable: (entry: any) => void;
  onAddAnnouncement: (ann: any) => void;
  onCreateClass: (subj: string) => void;
  attendance: any[];
  students: any[];
  subordinateStaff: any[];
  homework: any[];
  homeBgUrl: string;
  onPostHomework: (content: string, image: string | undefined, grade: string) => void;
  onUpgradeGrades?: () => void;
  onUpdateHomeBg?: (url: string) => void;
  onAddSubordinate?: (staff: any) => void;
  announcements: any[];
}> = ({ 
    user, timetable, onAddTimetable, onAddAnnouncement, onCreateClass, 
    attendance, students, subordinateStaff, homework, homeBgUrl, 
    onPostHomework, onUpgradeGrades, onUpdateHomeBg, onAddSubordinate,
    announcements
}) => {
  
  if (user.role === 'admin') {
    return <AdminView 
        user={user}
        timetable={timetable} 
        onAddTimetable={onAddTimetable} 
        onAddAnnouncement={onAddAnnouncement} 
        students={students}
        subordinateStaff={subordinateStaff}
        onUpgradeGrades={onUpgradeGrades}
        homeBgUrl={homeBgUrl}
        onUpdateHomeBg={onUpdateHomeBg}
        onAddSubordinate={onAddSubordinate}
    />;
  }
  
  if (user.role === 'staff') {
    return <StaffView 
        user={user} 
        timetable={timetable} 
        onCreateClass={onCreateClass} 
        attendance={attendance} 
        students={students}
        onPostHomework={onPostHomework}
        homework={homework}
        onAddAnnouncement={onAddAnnouncement}
    />;
  }

  if (user.role === 'subordinate') {
      return <SubordinateView user={user} announcements={announcements} />;
  }

  if (user.role === 'parent') {
      return <ParentView user={user} students={students} announcements={announcements} timetable={timetable} />;
  }
  
  return <StudentView 
    user={user} 
    timetable={timetable} 
    attendance={attendance} 
    onCreateClass={onCreateClass} 
    homework={homework}
  />;
};

const AdminView = ({ 
    user, timetable, onAddTimetable, students, subordinateStaff, 
    onUpgradeGrades, homeBgUrl, onUpdateHomeBg, onAddSubordinate, onAddAnnouncement
}: any) => {
  const [newEntry, setNewEntry] = useState({ day: 'Monday', time: '', subject: '', teacher: '', grade: '' });
  const [bgInput, setBgInput] = useState(homeBgUrl);
  const [newSubStaff, setNewSubStaff] = useState({ fullName: '', areaOfWork: '', idNumber: '' });
  
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annTarget, setAnnTarget] = useState<'all' | 'students' | 'parents' | 'staff' | 'teachers'>('all');

  const handleTimetableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTimetable({ ...newEntry, id: Math.random().toString(36).substr(2, 9) });
    setNewEntry({ day: 'Monday', time: '', subject: '', teacher: '', grade: '' });
  };

  const handleSubordinateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddSubordinate({ 
        ...newSubStaff, 
        id: Math.random().toString(36).substr(2, 9),
        registeredDate: new Date().toISOString().split('T')[0]
    });
    setNewSubStaff({ fullName: '', areaOfWork: '', idNumber: '' });
  };

  const handleAnnouncementSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onAddAnnouncement({
          id: Math.random().toString(36).substr(2, 9),
          title: annTitle,
          content: annContent,
          target: annTarget,
          date: new Date().toISOString().split('T')[0],
          senderName: user.fullName,
          senderRole: user.role
      });
      setAnnTitle('');
      setAnnContent('');
  };

  const grades = Array.from(new Set(students.map((s: any) => s.grade))).sort();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Control Panel</h1>
          <p className="text-slate-500">Manage school activities, staff, and communications</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="gap-2 text-primary border-primary" onClick={onUpgradeGrades}>
                <ArrowUpCircle className="h-4 w-4" /> Yearly Grade Upgrade
            </Button>
        </div>
      </div>

      <Tabs defaultValue="announcements" className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:w-[800px] mb-8">
            <TabsTrigger value="announcements" className="gap-2"><Bell className="h-4 w-4" /> Communication</TabsTrigger>
            <TabsTrigger value="scheduling" className="gap-2"><Calendar className="h-4 w-4" /> Scheduling</TabsTrigger>
            <TabsTrigger value="students" className="gap-2"><Users className="h-4 w-4" /> Students</TabsTrigger>
            <TabsTrigger value="staff" className="gap-2"><Truck className="h-4 w-4" /> Non-Teach</TabsTrigger>
            <TabsTrigger value="branding" className="gap-2"><Layout className="h-4 w-4" /> Branding</TabsTrigger>
        </TabsList>

        <TabsContent value="announcements">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Send className="h-5 w-5" /> Send School Communication</CardTitle>
                    <CardDescription>Target parents, staff, teachers, or send mass updates to everyone.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Announcement Title</Label>
                                <Input 
                                    value={annTitle} 
                                    onChange={e => setAnnTitle(e.target.value)} 
                                    placeholder="e.g. End of Term Notice" 
                                    required 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Target Audience</Label>
                                <select 
                                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                                    value={annTarget}
                                    onChange={e => setAnnTarget(e.target.value as any)}
                                >
                                    <option value="all">Everyone (Mass Communication)</option>
                                    <option value="parents">Parents Only</option>
                                    <option value="teachers">Teachers Only</option>
                                    <option value="staff">Non-Teaching Staff Only</option>
                                    <option value="students">Students Only</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Message Content</Label>
                            <Textarea 
                                value={annContent} 
                                onChange={e => setAnnContent(e.target.value)} 
                                placeholder="Type your detailed announcement here..." 
                                className="min-h-[150px]"
                                required 
                            />
                        </div>
                        <Button type="submit" className="w-full gap-2"><Send className="h-4 w-4" /> Broadcast Announcement</Button>
                    </form>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="scheduling" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Plus className="h-5 w-5" /> Add Timetable Entry</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleTimetableSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                            <Label>Day</Label>
                            <Input value={newEntry.day} onChange={e => setNewEntry({...newEntry, day: e.target.value})} placeholder="Monday" required />
                            </div>
                            <div className="space-y-2">
                            <Label>Time</Label>
                            <Input value={newEntry.time} onChange={e => setNewEntry({...newEntry, time: e.target.value})} placeholder="08:00 AM" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Subject</Label>
                            <Input value={newEntry.subject} onChange={e => setNewEntry({...newEntry, subject: e.target.value})} placeholder="Mathematics" required />
                        </div>
                        <div className="space-y-2">
                            <Label>Teacher Name</Label>
                            <Input value={newEntry.teacher} onChange={e => setNewEntry({...newEntry, teacher: e.target.value})} placeholder="Mr. John Doe" required />
                        </div>
                        <div className="space-y-2">
                            <Label>Grade/Class</Label>
                            <Input value={newEntry.grade} onChange={e => setNewEntry({...newEntry, grade: e.target.value})} placeholder="Grade 8" required />
                        </div>
                        <Button type="submit" className="w-full gap-2"><Plus className="h-4 w-4" /> Add Entry</Button>
                    </form>
                </CardContent>
                </Card>

                <Card>
                <CardHeader>
                    <CardTitle>Current Timetable</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Day/Time</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Grade</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {timetable.map((t: any) => (
                        <TableRow key={t.id}>
                            <TableCell className="font-medium">{t.day} {t.time}</TableCell>
                            <TableCell>{t.subject}</TableCell>
                            <TableCell><Badge variant="outline">{t.grade}</Badge></TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </CardContent>
                </Card>
            </div>
        </TabsContent>

        <TabsContent value="students">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> Student Directory</CardTitle>
                    <CardDescription>Kindergarten to Grade 9 Student List</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {grades.map((grade: any) => (
                            <div key={grade} className="space-y-3">
                                <h3 className="font-bold text-lg border-b pb-1 text-primary">{grade}</h3>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Admission No</TableHead>
                                            <TableHead>Full Name</TableHead>
                                            <TableHead>Enrollment Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {students.filter((s: any) => s.grade === grade).map((s: any) => (
                                            <TableRow key={s.id}>
                                                <TableCell className="font-mono text-xs">{s.admissionNo}</TableCell>
                                                <TableCell className="font-medium">{s.fullName}</TableCell>
                                                <TableCell className="text-slate-500 text-xs">{s.enrollmentDate}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="staff" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><UserCheck className="h-5 w-5" /> Register Staff</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubordinateSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Full Governmental Name</Label>
                                <Input 
                                    value={newSubStaff.fullName} 
                                    onChange={e => setNewSubStaff({...newSubStaff, fullName: e.target.value})} 
                                    placeholder="Enter legal name" 
                                    required 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Area of Work</Label>
                                <Input 
                                    value={newSubStaff.areaOfWork} 
                                    onChange={e => setNewSubStaff({...newSubStaff, areaOfWork: e.target.value})} 
                                    placeholder="e.g. Driver" 
                                    required 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>ID Number</Label>
                                <Input 
                                    value={newSubStaff.idNumber} 
                                    onChange={e => setNewSubStaff({...newSubStaff, idNumber: e.target.value})} 
                                    placeholder="National ID" 
                                    required 
                                />
                            </div>
                            <Button type="submit" className="w-full">Add Staff</Button>
                        </form>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Staff Directory</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Full Name</TableHead>
                                    <TableHead>Designation</TableHead>
                                    <TableHead>ID Number</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {subordinateStaff.map((staff: any) => (
                                    <TableRow key={staff.id}>
                                        <TableCell className="font-medium">{staff.fullName}</TableCell>
                                        <TableCell><Badge variant="secondary">{staff.areaOfWork}</Badge></TableCell>
                                        <TableCell className="font-mono text-xs">{staff.idNumber}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>

        <TabsContent value="branding">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5" /> Site Customization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Homepage Hero Background Image</Label>
                        <div className="flex gap-2">
                            <Input 
                                value={bgInput} 
                                onChange={e => setBgInput(e.target.value)} 
                                placeholder="Paste image URL here" 
                            />
                            <Button onClick={() => onUpdateHomeBg(bgInput)}>Update</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const StaffView = ({ user, timetable, onCreateClass, students, onPostHomework, homework, onAddAnnouncement }: any) => {
  const [homeworkContent, setHomeworkContent] = useState('');
  const [homeworkGrade, setHomeworkGrade] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annTarget, setAnnTarget] = useState<'parents' | 'teachers'>('parents');

  const staffTimetable = timetable.filter((t: any) => t.teacher.includes(user.fullName) || t.subject.toLowerCase().includes(user.subjects?.[0]?.toLowerCase()));
  const taughtGrades = Array.from(new Set(staffTimetable.map((t: any) => t.grade)));
  const myStudents = students.filter((s: any) => taughtGrades.includes(s.grade));

  const handlePostHomework = (e: React.FormEvent) => {
      e.preventDefault();
      const imageUrl = selectedFile ? URL.createObjectURL(selectedFile) : undefined;
      onPostHomework(homeworkContent, imageUrl, homeworkGrade);
      setHomeworkContent('');
      setHomeworkGrade('');
      setSelectedFile(null);
  };

  const handleAnnouncementSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onAddAnnouncement({
          id: Math.random().toString(36).substr(2, 9),
          title: annTitle,
          content: annContent,
          target: annTarget,
          date: new Date().toISOString().split('T')[0],
          senderName: user.fullName,
          senderRole: user.role
      });
      setAnnTitle('');
      setAnnContent('');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
            <p className="text-slate-500">Welcome, {user.fullName}. Your subjects: {user.subjects?.join(', ')}</p>
        </div>
        <Button size="lg" className="gap-2" onClick={() => onCreateClass(user.subjects?.[0] || 'General')}>
          <Video className="h-5 w-5" /> Start Online Class
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> Communicate with Parents/Teachers</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Topic</Label>
                                <Input value={annTitle} onChange={e => setAnnTitle(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Send To</Label>
                                <select 
                                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                                    value={annTarget}
                                    onChange={e => setAnnTarget(e.target.value as any)}
                                >
                                    <option value="parents">Class Parents</option>
                                    <option value="teachers">Other Teachers</option>
                                </select>
                            </div>
                        </div>
                        <Textarea value={annContent} onChange={e => setAnnContent(e.target.value)} placeholder="Type message..." required />
                        <Button type="submit" className="w-full">Send Information</Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5" /> Post Homework</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handlePostHomework} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Target Grade</Label>
                            <select 
                                className="w-full h-10 px-3 rounded-md border border-input bg-background"
                                value={homeworkGrade}
                                onChange={e => setHomeworkGrade(e.target.value)}
                                required
                            >
                                <option value="">Select Grade</option>
                                {taughtGrades.map((g: any) => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>
                        <Textarea placeholder="Details..." value={homeworkContent} onChange={e => setHomeworkContent(e.target.value)} />
                        <div className="flex items-center gap-2">
                            <Input type="file" onChange={e => setSelectedFile(e.target.files?.[0] || null)} />
                        </div>
                        <Button type="submit" className="w-full">Post Assignment</Button>
                    </form>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> My Students</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[300px]">
                        <div className="space-y-4">
                            {taughtGrades.map((grade: any) => (
                                <div key={grade} className="space-y-1">
                                    <h4 className="font-bold text-sm text-primary">{grade}</h4>
                                    {myStudents.filter((s: any) => s.grade === grade).map((s: any) => (
                                        <div key={s.id} className="text-xs flex justify-between">
                                            <span>{s.fullName}</span>
                                            <span className="text-slate-400">{s.admissionNo}</span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

const SubordinateView = ({ user, announcements }: any) => {
    const myAnnouncements = announcements.filter((a: any) => a.target === 'all' || a.target === 'staff');

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <Card className="bg-gradient-to-br from-slate-900 to-primary text-white">
                <CardHeader>
                    <CardTitle>Staff Portal: {user.fullName}</CardTitle>
                    <CardDescription className="text-white/60">{user.areaOfWork} | ID: {user.idNumber}</CardDescription>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Staff Information & Announcements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {myAnnouncements.map((ann: any) => (
                        <div key={ann.id} className="p-4 border rounded-lg bg-slate-50">
                            <h4 className="font-bold">{ann.title}</h4>
                            <p className="text-sm text-slate-600">{ann.content}</p>
                            <p className="text-[10px] text-slate-400 mt-2">Posted on {ann.date}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

const ParentView = ({ user, students, announcements, timetable }: any) => {
    const child = students.find((s: any) => s.admissionNo === user.childAdmissionNo);
    const myAnnouncements = announcements.filter((a: any) => a.target === 'all' || a.target === 'parents');
    const childTimetable = timetable.filter((t: any) => t.grade === child?.grade);

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-pink-100 rounded-full flex items-center justify-center">
                    <Heart className="h-8 w-8 text-pink-600" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">Parent Portal</h1>
                    <p className="text-slate-500">Welcome, {user.fullName}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Baby className="h-5 w-5" /> Student Profile</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-center">
                            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary font-bold text-2xl">
                                {child?.fullName.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{child?.fullName}</h3>
                                <p className="text-sm text-slate-500">{child?.grade}</p>
                                <p className="text-xs font-mono text-primary mt-1">ADM: {child?.admissionNo}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">Attendance Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between text-xs mb-2">
                                <span>Attendance Rate</span>
                                <span className="font-bold">94%</span>
                            </div>
                            <Progress value={94} className="h-1" />
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> School Communications</CardTitle>
                            <CardDescription>Important information for parents</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {myAnnouncements.map((ann: any) => (
                                <div key={ann.id} className="p-4 border rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-primary">{ann.title}</h4>
                                        <Badge variant="outline" className="text-[10px]">{ann.date}</Badge>
                                    </div>
                                    <p className="text-sm text-slate-700 whitespace-pre-wrap">{ann.content}</p>
                                    <div className="mt-2 text-[10px] text-slate-400">From: {ann.senderName} ({ann.senderRole})</div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">Child's Weekly Schedule</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Time</TableHead>
                                        <TableHead>Subject</TableHead>
                                        <TableHead>Teacher</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {childTimetable.map((t: any) => (
                                        <TableRow key={t.id}>
                                            <TableCell className="text-xs">{t.day} {t.time}</TableCell>
                                            <TableCell className="text-xs font-bold">{t.subject}</TableCell>
                                            <TableCell className="text-xs">{t.teacher}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

const StudentView = ({ user, timetable, homework, onCreateClass }: any) => {
  const myTimetable = timetable.filter((t: any) => t.grade === user.grade);
  const myHomework = homework.filter((h: any) => h.grade === user.grade);
  const attendanceRate = 88;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-slate-500">Welcome, {user.fullName} ({user.grade})</p>
        </div>
        <Card className="bg-primary/5 border-primary/20 flex items-center px-6 py-2">
            <div>
                <p className="text-xs text-slate-500">Weekly Attendance</p>
                <p className="text-xl font-bold text-primary">{attendanceRate}%</p>
            </div>
            <div className="ml-4 w-24">
                <Progress value={attendanceRate} className="h-2" />
            </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>My Class Timetable</CardTitle>
                    <CardDescription>Visible classes for your grade</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Day/Time</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Teacher</TableHead>
                        <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {myTimetable.map((t: any) => (
                        <TableRow key={t.id}>
                            <TableCell>{t.day} {t.time}</TableCell>
                            <TableCell className="font-semibold text-primary">{t.subject}</TableCell>
                            <TableCell>{t.teacher}</TableCell>
                            <TableCell>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="gap-2"
                                    onClick={() => {
                                        onCreateClass(t.subject);
                                        toast.info(`Joining ${t.subject} class... Notification sent.`);
                                    }}
                                >
                                    <Video className="h-3 w-3" /> Join
                                </Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Book className="h-5 w-5" /> Homework & Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {myHomework.length > 0 ? myHomework.map((h: any) => (
                            <div key={h.id} className="p-4 border rounded-xl hover:bg-slate-50 transition-colors space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-primary">{h.teacherName}</h4>
                                        <p className="text-[10px] text-slate-500">{new Date(h.timestamp).toLocaleString()}</p>
                                    </div>
                                    <Badge>New</Badge>
                                </div>
                                <p className="text-slate-700 whitespace-pre-wrap">{h.content}</p>
                                {h.imageUrl && (
                                    <div className="mt-4">
                                        <img src={h.imageUrl} alt="Homework Attachment" className="max-h-64 rounded-lg border object-cover" />
                                    </div>
                                )}
                            </div>
                        )) : (
                            <div className="text-center py-12 text-slate-400">
                                <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-20" />
                                <p>No homework assigned yet.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
            <Card className="bg-gradient-to-br from-indigo-600 to-primary text-white">
                <CardHeader>
                    <CardTitle className="text-white">Active Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/20">
                        <p className="text-xs font-semibold mb-1">Incoming Class Alert</p>
                        <p className="text-sm opacity-90">Mathematics starts in 5 mins. Prepare your materials!</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

const ScrollArea = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={`overflow-y-auto ${className}`}>{children}</div>
);