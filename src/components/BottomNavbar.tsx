
import React from 'react';
import { Home, MessageSquare, Calendar, BookOpen, User } from 'lucide-react';

const BottomNavbar = () => {
  const navItems = [
    { icon: Home, label: 'Beranda', active: true },
    { icon: MessageSquare, label: 'Forum', active: false },
    { icon: Calendar, label: 'Agenda', active: false },
    { icon: BookOpen, label: 'Koleksi', active: false },
    { icon: User, label: 'Profil', active: false },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50 md:hidden">
      <div className="flex justify-around items-center">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                item.active 
                  ? 'text-library-600 bg-library-50' 
                  : 'text-gray-500 hover:text-library-600'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavbar;
