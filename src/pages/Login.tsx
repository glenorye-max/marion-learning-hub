import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, ShieldCheck, Truck, GraduationCap, Heart } from 'lucide-react';
import { UserRole } from '../types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { KENYAN_GRADES } from '../lib/mockData';

interface LoginProps {
  onLogin: (user: any) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const logoUrl = "https://storage.googleapis.com/dala-prod-public-storage/attachments/2efa123b-bfe3-4c0a-9a83-e47ed9444b67/1779796464956_612048823_1488129283315922_2689444480805906962_n.jpg";
  
  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'student' as UserRole,
      admissionNo: formData.get('admissionNo') as string,
      fullName: formData.get('fullName') as string,
      grade: formData.get('grade') as string,
      enrollmentDate: new Date().toISOString().split('T')[0]
    };
    if (data.admissionNo && data.fullName && data.grade) {
      onLogin(data);
      toast.success(`Welcome, ${data.fullName}! Registered for ${data.grade}.`);
      navigate('/dashboard');
    }
  };

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      id: 't1', 
      role: 'staff' as UserRole,
      email: formData.get('email') as string,
      fullName: formData.get('fullName') as string,
      subjects: (formData.get('subjects') as string).split(','),
    };
    if (data.email && data.fullName && data.subjects.length > 0) {
      onLogin(data);
      toast.success(`Welcome back, teacher ${data.fullName}!`);
      navigate('/dashboard');
    }
  };

  const handleParentLogin = (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const data = {
          id: Math.random().toString(36).substr(2, 9),
          role: 'parent' as UserRole,
          fullName: formData.get('fullName') as string,
          email: formData.get('email') as string,
          childAdmissionNo: formData.get('childAdmissionNo') as string,
      };
      if (data.fullName && data.email && data.childAdmissionNo) {
          onLogin(data);
          toast.success(`Parent Access Granted: ${data.fullName}`);
          navigate('/dashboard');
      }
  };

  const handleSubordinateLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'subordinate' as UserRole,
      fullName: formData.get('fullName') as string,
      areaOfWork: formData.get('areaOfWork') as string,
      idNumber: formData.get('idNumber') as string,
    };
    if (data.fullName && data.areaOfWork && data.idNumber) {
      onLogin(data);
      toast.success(`Staff Access Granted: ${data.fullName}`);
      navigate('/dashboard');
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      id: 'admin-1',
      role: 'admin' as UserRole,
      fullName: 'School Administrator',
    };
    onLogin(data);
    toast.success("Logged in as Administrator");
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-primary">
        <CardHeader className="text-center">
          <div className="mx-auto w-20 h-20 rounded-full border p-1 bg-white mb-4 overflow-hidden">
            <img src={logoUrl} alt="School Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <CardTitle className="text-2xl">LMS Portal</CardTitle>
          <CardDescription>Select your role to access Marion Preparatory LMS</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="student" className="px-1 text-[8px] md:text-[10px]"><GraduationCap className="h-3 w-3" /> Student</TabsTrigger>
              <TabsTrigger value="staff" className="px-1 text-[8px] md:text-[10px]"><Briefcase className="h-3 w-3" /> Staff</TabsTrigger>
              <TabsTrigger value="parent" className="px-1 text-[8px] md:text-[10px]"><Heart className="h-3 w-3" /> Parent</TabsTrigger>
              <TabsTrigger value="subordinate" className="px-1 text-[8px] md:text-[10px]"><Truck className="h-3 w-3" /> Non-Teach</TabsTrigger>
              <TabsTrigger value="admin" className="px-1 text-[8px] md:text-[10px]"><ShieldCheck className="h-3 w-3" /> Admin</TabsTrigger>
            </TabsList>

            <TabsContent value="student">
              <form onSubmit={handleStudentLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label>Admission Number</Label>
                  <Input name="admissionNo" placeholder="MP-XXXX-XXX" required />
                </div>
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input name="fullName" placeholder="Enter full name" required />
                </div>
                <div className="space-y-2">
                  <Label>Current Grade</Label>
                  <select name="grade" className="w-full h-10 px-3 rounded-md border border-input bg-background" required>
                    {KENYAN_GRADES.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <Button type="submit" className="w-full">Access Portal</Button>
              </form>
            </TabsContent>

            <TabsContent value="staff">
              <form onSubmit={handleStaffLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label>Work Email</Label>
                  <Input name="email" type="email" placeholder="name@marion.ac.ke" required />
                </div>
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input name="fullName" required />
                </div>
                <div className="space-y-2">
                  <Label>Subjects</Label>
                  <Input name="subjects" placeholder="Math, Science" required />
                </div>
                <Button type="submit" className="w-full">Teacher Login</Button>
              </form>
            </TabsContent>

            <TabsContent value="parent">
                <form onSubmit={handleParentLogin} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input name="fullName" placeholder="Parent/Guardian Name" required />
                    </div>
                    <div className="space-y-2">
                        <Label>Email Address</Label>
                        <Input name="email" type="email" placeholder="Receive school updates" required />
                    </div>
                    <div className="space-y-2">
                        <Label>Child's Admission Number</Label>
                        <Input name="childAdmissionNo" placeholder="Verification required" required />
                    </div>
                    <Button type="submit" className="w-full">Create / Access Account</Button>
                </form>
            </TabsContent>

            <TabsContent value="subordinate">
              <form onSubmit={handleSubordinateLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Legal Name</Label>
                  <Input name="fullName" required />
                </div>
                <div className="space-y-2">
                  <Label>Area of Work</Label>
                  <Input name="areaOfWork" placeholder="e.g. Driver" required />
                </div>
                <div className="space-y-2">
                  <Label>ID Number</Label>
                  <Input name="idNumber" required />
                </div>
                <Button type="submit" className="w-full">Staff Login</Button>
              </form>
            </TabsContent>

            <TabsContent value="admin">
              <form onSubmit={handleAdminLogin} className="space-y-4 text-center py-4">
                <p className="text-xs text-slate-500 mb-4">Secure administrator access only.</p>
                <Button type="submit" variant="outline" className="w-full">Admin Dashboard</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};