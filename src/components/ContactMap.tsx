import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const ContactMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapContainer.current || map.current) return;

      try {
        // Fetch the Mapbox token from edge function
        const { data, error: fetchError } = await supabase.functions.invoke('get-mapbox-token');
        
        if (fetchError || !data?.token) {
          throw new Error('Failed to load map configuration');
        }

        mapboxgl.accessToken = data.token;
        
        // Addis Ababa, Ethiopia coordinates
        const addisAbaba: [number, number] = [38.7578, 9.0222];
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/dark-v11',
          center: addisAbaba,
          zoom: 13,
          pitch: 45,
        });

        // Add navigation controls
        map.current.addControl(
          new mapboxgl.NavigationControl({
            visualizePitch: true,
          }),
          'top-right'
        );

        // Add marker for Addis Ababa location
        const marker = new mapboxgl.Marker({ 
          color: '#38BDF8',
          scale: 1.2
        })
          .setLngLat(addisAbaba)
          .setPopup(
            new mapboxgl.Popup({ offset: 25, closeButton: false })
              .setHTML(`
                <div style="padding: 8px;">
                  <h3 style="color: #1a1a1a; margin: 0; font-weight: 600; font-size: 14px;">📍 Addis Ababa, Ethiopia</h3>
                  <p style="color: #666; margin: 6px 0 0 0; font-size: 12px;">Available for remote work worldwide</p>
                </div>
              `)
          )
          .addTo(map.current);

        // Open popup by default
        marker.togglePopup();

        // Add atmosphere and fog effects
        map.current.on('style.load', () => {
          map.current?.setFog({
            color: 'rgb(30, 30, 40)',
            'high-color': 'rgb(50, 50, 70)',
            'horizon-blend': 0.1,
          });
        });

        setIsLoading(false);
      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Unable to load map');
        setIsLoading(false);
      }
    };

    initializeMap();

    return () => {
      map.current?.remove();
    };
  }, []);

  if (error) {
    return (
      <div className="glass-card p-8 rounded-xl flex flex-col items-center justify-center h-[400px]">
        <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground text-center">
          📍 Addis Ababa, Ethiopia
        </p>
        <p className="text-sm text-muted-foreground/60 mt-2">
          Available for remote work worldwide
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden glass-card">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10" />
    </div>
  );
};

export default ContactMap;
