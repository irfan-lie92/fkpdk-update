
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient?: string;
  comingSoon?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon: Icon,
  gradient = "bg-gradient-library",
  comingSoon = false
}) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
      {comingSoon && (
        <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
          Segera
        </div>
      )}
      <CardHeader className="pb-3">
        <div className={`w-12 h-12 rounded-lg ${gradient} flex items-center justify-center mb-3`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <Button 
          variant={comingSoon ? "secondary" : "default"} 
          size="sm" 
          className="w-full"
          disabled={comingSoon}
        >
          {comingSoon ? 'Segera Hadir' : 'Buka Fitur'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
