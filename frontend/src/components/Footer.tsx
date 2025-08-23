import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-minimal">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">⚽</span>
              </div>
              <h3 className="text-lg font-bold text-primary">Soccer Shirt</h3>
            </div>
            <p className="text-secondary text-sm leading-relaxed">
              Camisas oficiais dos melhores times do mundo com qualidade garantida.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-primary mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="minimal-link">Home</Link>
              </li>
              <li>
                <Link to="/catalog" className="minimal-link">Catálogo</Link>
              </li>
              <li>
                <a href="#" className="minimal-link">Promoções</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-primary mb-4">Contato</h4>
            <div className="space-y-2">
              <a href="mailto:contato@soccershirt.com" className="minimal-link block">
                contato@soccershirt.com
              </a>
              <a href="https://wa.me/5511999999999" className="minimal-link block">
                WhatsApp: (11) 99999-9999
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-primary mb-4">Newsletter</h4>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="minimal-input w-full"
              />
              <button className="minimal-button w-full">
                Inscrever-se
              </button>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-secondary text-sm">
            &copy; {currentYear} Soccer Shirt. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
