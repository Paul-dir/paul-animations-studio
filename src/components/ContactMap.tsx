import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MapPin } from 'lucide-react';

const ContactMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isTokenSet, setIsTokenSet] = useState(false);

  const initializeMap = (token: string) => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = token;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [38.7469, 9.0320], // Addis Ababa coordinates
        zoom: 12,
        pitch: 45,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add marker for location
      new mapboxgl.Marker({ color: '#38BDF8' })
        .setLngLat([38.7469, 9.0320])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML('<h3 style="color: #1a1a1a; margin: 0;">Addis Ababa, Ethiopia</h3><p style="color: #666; margin: 5px 0 0 0;">Get in touch!</p>')
        )
        .addTo(map.current);

      // Add atmosphere
      map.current.on('style.load', () => {
        map.current?.setFog({
          color: 'rgb(30, 30, 40)',
          'high-color': 'rgb(50, 50, 70)',
          'horizon-blend': 0.1,
        });
      });
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  const handleSetToken = () => {
    if (mapboxToken.trim()) {
      setIsTokenSet(true);
      initializeMap(mapboxToken);
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (!isTokenSet) {
    return (
      <div className="glass-card p-8 rounded-xl">
        <div className="flex items-center gap-2 mb-4 text-primary">
          <MapPin className="h-6 w-6" />
          <h3 className="text-xl font-semibold">Interactive Map</h3>
        </div>
        <p className="text-muted-foreground mb-6">
          To view the interactive map, please enter your Mapbox public token. You can get one for free at{' '}
          <a 
            href="https://www.mapbox.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            mapbox.com
          </a>
        </p>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter your Mapbox token..."
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSetToken} disabled={!mapboxToken.trim()}>
            Load Map
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden glass-card">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10" />
    </div>
  );
};

export default ContactMap;
