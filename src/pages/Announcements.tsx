import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Info, User } from 'lucide-react';
import { Announcement } from '../types';

export const Announcements: React.FC<{ announcements: Announcement[] }> = ({ announcements }) => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">School Announcements</h1>
        <p className="text-slate-500">Official updates and targeted communications from Marion Preparatory</p>
      </div>

      <div className="grid gap-6">
        {announcements.length > 0 ? announcements.map((ann) => (
          <Card key={ann.id} className="hover:shadow-md transition-all duration-300 border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                   <CardTitle className="text-xl">{ann.title}</CardTitle>
                   <Badge variant={ann.target === 'all' ? 'default' : ann.target === 'parents' ? 'secondary' : 'outline'}>
                    {ann.target.toUpperCase()}
                   </Badge>
                </div>
                <div className="flex items-center gap-4 text-slate-500 text-[10px] uppercase font-bold tracking-tighter">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(ann.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {ann.senderName} ({ann.senderRole})
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{ann.content}</p>
            </CardContent>
            <CardFooter className="bg-slate-50/50 py-3 flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Blessed • Balanced • Bold • Beautiful</span>
            </CardFooter>
          </Card>
        )) : (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed">
                <Bell className="h-12 w-12 mx-auto text-slate-300 mb-2" />
                <p className="text-slate-500">No announcements posted at this time.</p>
            </div>
        )}
      </div>
    </div>
  );
};

// Simple icon for empty state if Bell is not imported
const Bell = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
);