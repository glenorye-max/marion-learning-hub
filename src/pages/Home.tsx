import React from 'react';
import { Button } from '@/components/ui/button';
import { Award, Zap, Heart, ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLMS } from '@/lib/store';

export const Home = () => {
  const navigate = useNavigate();
  const lms = useLMS();
  const logoUrl = "https://storage.googleapis.com/dala-prod-public-storage/attachments/2efa123b-bfe3-4c0a-9a83-e47ed9444b67/1779796464956_612048823_1488129283315922_2689444480805906962_n.jpg";
  
  const mottos = [
    { word: 'Blessed', icon: <Heart className="h-8 w-8 text-pink-500" />, desc: 'Grateful and spiritually grounded community.' },
    { word: 'Balanced', icon: <Zap className="h-8 w-8 text-blue-500" />, desc: 'Excellence in both academics and co-curriculars.' },
    { word: 'Bold', icon: <Award className="h-8 w-8 text-amber-500" />, desc: 'Courageous leaders of tomorrow.' },
    { word: 'Beautiful', icon: <img src={logoUrl} className="h-10 w-10 rounded-full" />, desc: 'Character that shines from within.' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 transition-all duration-700">
          <img 
            src={lms.homeBgUrl} 
            className="w-full h-full object-cover brightness-[0.4]"
            alt="School Campus"
          />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="mb-6 flex justify-center">
             <div className="bg-white/90 p-2 rounded-full shadow-2xl backdrop-blur-sm border-2 border-white">
                <img src={logoUrl} alt="Marion Preparatory Logo" className="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover" />
             </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight">
            Marion Preparatory Schools
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-8 font-light italic">
            "Blessed. Balanced. Bold. Beautiful."
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="h-14 px-8 text-lg" onClick={() => navigate('/login')}>
              Enter Portal <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-white/10 text-white border-white/30 hover:bg-white/20">
              Virtual Tour <Play className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Motto Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The 4Bs of Marion</h2>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">Our core values define who we are and what we instill in every learner that walks through our halls.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mottos.map((m) => (
              <div key={m.word} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-primary/20 hover:shadow-lg transition-all text-center">
                <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-sm overflow-hidden p-1">
                  {m.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{m.word}</h3>
                <p className="text-slate-600">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary">
              Modern Learning
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Advanced Online Classroom Environment</h2>
            <p className="text-lg text-slate-600">
              Our LMS features integrated live video sessions with focus-mode enforcement, ensuring students stay engaged 
              during every lesson. With automated attendance and direct teacher-to-student controls.
            </p>
            <ul className="space-y-4">
              {['Live Video & Audio', 'Interactive Screen Sharing', 'Automated Attendance Tracking', 'Focus Mode Enforcement'].map(f => (
                <li key={f} className="flex items-center gap-3 font-medium text-slate-700">
                  <Zap className="h-5 w-5 text-primary" /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 relative">
            <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl"></div>
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/8f9d704a-ca23-413b-abe7-1b8ff8e9135e/virtual-classroom-bg-a53e24e1-1779309864655.webp" 
              className="relative rounded-2xl shadow-2xl border border-white"
              alt="LMS Interface"
            />
          </div>
        </div>
      </section>
    </div>
  );
};