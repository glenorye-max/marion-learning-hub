import React from 'react';
import { LogOut, Bell, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  user: any;
  onLogout: () => void;
}

export const Navigation: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const logoUrl = "https://storage.googleapis.com/dala-prod-public-storage/attachments/2efa123b-bfe3-4c0a-9a83-e47ed9444b67/1779796464956_612048823_1488129283315922_2689444480805906962_n.jpg";

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-10 w-10 overflow-hidden rounded-full border border-primary/20">
                <img src={logoUrl} alt="Marion Prep Logo" className="h-full w-full object-cover" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900 block leading-none">Marion Preparatory</span>
                <span className="text-[10px] text-primary font-semibold tracking-widest uppercase">Blessed \u2022 Balanced \u2022 Bold \u2022 Beautiful</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/announcements" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-1">
              <Bell className="h-4 w-4" />
              Announcements
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  Dashboard
                </Link>
                <div className="flex items-center gap-3 ml-4 pl-4 border-l">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                    <Badge variant="secondary" className="text-[10px] py-0">{user.role.toUpperCase()}</Badge>
                  </div>
                  <Button variant="ghost" size="icon" onClick={onLogout} className="text-gray-500 hover:text-destructive">
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              </>
            ) : (
              <Button onClick={() => navigate('/login')}>Sign In</Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};