import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Activity, Bell, MapPin, User } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/', icon: Home, label: '홈' },
  { path: '/checkup', icon: Activity, label: '검진결과' },
  { path: '/hospitals', icon: MapPin, label: '병원찾기' },
  { path: '/alerts', icon: Bell, label: '알림' },
  { path: '/profile', icon: User, label: '내정보' },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* 메인 컨텐츠 */}
      <main className="max-w-lg mx-auto">
        {children}
      </main>

      {/* 하단 네비게이션 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 safe-area-bottom">
        <div className="max-w-lg mx-auto flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path !== '/' && location.pathname.startsWith(item.path));
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${
                  isActive
                    ? 'text-primary-600'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-xs mt-1 ${isActive ? 'font-semibold' : 'font-medium'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
