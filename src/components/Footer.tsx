import React from 'react';

export function Footer() {
  return (
    <footer className="border-t py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">Paul Animations Studio</h3>
            <p className="text-sm text-muted-foreground">
              Professional motion graphics and 3D animations
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Designed and developed by <strong>Pawlos Diriba</strong>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
