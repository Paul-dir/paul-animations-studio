import { MapPin, ExternalLink } from 'lucide-react';

const ContactMap = () => {
  const googleMapsUrl = "https://maps.app.goo.gl/JTSXvRHf1a5SErGv5";

  return (
    <a 
      href={googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="glass-card p-8 rounded-xl relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-50" />
        
        {/* Map illustration */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/20">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">My Location</h3>
                <p className="text-muted-foreground text-sm">Click to open in Google Maps</p>
              </div>
            </div>
            <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          
          {/* Location details */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇪🇹</span>
              <div>
                <p className="font-medium text-foreground">Addis Ababa, Ethiopia</p>
                <p className="text-sm text-muted-foreground">East Africa</p>
              </div>
            </div>
            
            <div className="h-px bg-border/50 my-4" />
            
            <p className="text-sm text-muted-foreground">
              📍 Available for remote work worldwide
            </p>
          </div>
          
          {/* Decorative map dots */}
          <div className="absolute bottom-4 right-4 opacity-20">
            <div className="grid grid-cols-5 gap-1">
              {Array.from({ length: 15 }).map((_, i) => (
                <div 
                  key={i} 
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                  style={{ opacity: Math.random() * 0.5 + 0.3 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ContactMap;
