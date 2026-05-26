import React, { useState, useEffect } from 'react';
import { Video, Mic, MicOff, Monitor, X, Users, MessageSquare, Hand, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface Participant {
  id: string;
  name: string;
  role: 'teacher' | 'student';
  micEnabled: boolean;
  screenSharing: boolean;
  isRaisingHand?: boolean;
}

export const VirtualClass: React.FC<{
  classId: string;
  user: any;
  subject: string;
  onExit: () => void;
  updatePermissions?: (sid: string, type: 'mic' | 'screenShare', val: boolean) => void;
  initialPermissions?: any;
}> = ({ classId, user, subject, onExit, updatePermissions, initialPermissions }) => {
  const isTeacher = user.role === 'staff';
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 't1', name: isTeacher ? user.fullName : 'Mr. John Doe', role: 'teacher', micEnabled: true, screenSharing: false },
    { id: isTeacher ? 's1' : user.id, name: isTeacher ? 'Sarah Wilson' : user.fullName, role: 'student', micEnabled: false, screenSharing: false },
    { id: 's2', name: 'James Kariuki', role: 'student', micEnabled: false, screenSharing: false },
  ]);

  const [isMuted, setIsMuted] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [focusWarning, setFocusWarning] = useState(false);

  useEffect(() => {
    if (!isTeacher) {
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
          setFocusWarning(true);
          toast.error("Focus Mode Active: Please stay on the class platform!");
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
  }, [isTeacher]);

  const toggleMic = (targetId: string) => {
    if (!isTeacher && targetId !== user.id) return;
    
    if (!isTeacher && !initialPermissions?.[user.id]?.mic) {
        toast.error("You need permission from the teacher to unmute.");
        return;
    }

    setParticipants(prev => prev.map(p => 
      p.id === targetId ? { ...p, micEnabled: !p.micEnabled } : p
    ));
    if (targetId === user.id) setIsMuted(!isMuted);
  };

  const handlePermissionGrant = (studentId: string, type: 'mic' | 'screenShare') => {
    if (!isTeacher) return;
    updatePermissions?.(studentId, type, true);
    toast.success(`Permission granted to ${participants.find(p => p.id === studentId)?.name}`);
  };

  return (
    <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col">
      <AnimatePresence>
        {focusWarning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/90 z-[200] flex flex-col items-center justify-center text-center p-6"
          >
            <ShieldAlert className="h-20 w-20 text-destructive mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">Attention Diverted!</h2>
            <p className="text-slate-400 max-w-md mb-8">
              Marion Preparatory Focus Mode is active. Switching platforms during a lesson is not allowed. 
              Your attendance record has been flagged.
            </p>
            <Button onClick={() => setFocusWarning(false)} size="lg">Return to Class</Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-slate-900/50 p-4 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-primary border-primary">LIVE</Badge>
          <h1 className="text-white font-semibold">{subject} Class - {classId}</h1>
        </div>
        <Button variant="destructive" size="sm" onClick={onExit} className="gap-2">
          <X className="h-4 w-4" /> Exit Class
        </Button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
          {participants.map(p => (
            <Card key={p.id} className="bg-slate-900 border-slate-800 relative aspect-video flex flex-col items-center justify-center group">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-slate-800 text-slate-400 text-2xl">{p.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">{p.name} {p.id === user.id && "(You)"}</span>
                <div className="flex gap-1">
                  {p.micEnabled ? <Mic className="h-3 w-3 text-green-500" /> : <MicOff className="h-3 w-3 text-red-500" />}
                </div>
              </div>
              
              {isTeacher && p.role === 'student' && (
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="sm" variant="secondary" onClick={() => handlePermissionGrant(p.id, 'mic')}>Allow Mic</Button>
                  <Button size="sm" variant="secondary" onClick={() => handlePermissionGrant(p.id, 'screenShare')}>Allow Screen</Button>
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="w-80 bg-slate-900 border-l border-slate-800 hidden lg:flex flex-col">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-white font-medium flex items-center gap-2">
              <Users className="h-4 w-4" /> Participants
            </h3>
            <Badge variant="secondary">{participants.length}</Badge>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {participants.map(p => (
                <div key={p.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-slate-800 text-[10px]">{p.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm text-white font-medium leading-none">{p.name}</p>
                      <p className="text-[10px] text-slate-500">{p.role}</p>
                    </div>
                  </div>
                  {isTeacher && p.id !== user.id && (
                    <Button variant="ghost" size="icon" onClick={() => toggleMic(p.id)}>
                      {p.micEnabled ? <Mic className="h-4 w-4 text-green-500" /> : <MicOff className="h-4 w-4 text-slate-500" />}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      <div className="bg-slate-900 p-6 flex justify-center items-center gap-6 border-t border-slate-800">
        <Button 
            variant={isMuted ? "destructive" : "secondary"} 
            size="icon" 
            className="rounded-full h-12 w-12"
            onClick={() => toggleMic(user.id)}
        >
          {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        </Button>
        <Button 
            variant={isScreenSharing ? "default" : "secondary"} 
            size="icon" 
            className="rounded-full h-12 w-12"
            onClick={() => {
                if (!isTeacher && !initialPermissions?.[user.id]?.screenShare) {
                    toast.error("Screen sharing requires teacher permission.");
                    return;
                }
                setIsScreenSharing(!isScreenSharing);
            }}
        >
          <Monitor className="h-6 w-6" />
        </Button>
        <Button variant="secondary" size="icon" className="rounded-full h-12 w-12">
          <Hand className="h-6 w-6" />
        </Button>
        <Button variant="secondary" size="icon" className="rounded-full h-12 w-12">
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};