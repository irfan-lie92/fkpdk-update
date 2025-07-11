
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm text-gray-400">
            © 2025 FKPDK - Forum Komunikasi Perpustakaan Desa/Kelurahan. 
            Dikembangkan oleh{' '}
            <a 
              href="https://irfan.desapasayangan.my.id/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-library-400 hover:text-library-300 transition-colors"
            >
              Irfan Ali
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
