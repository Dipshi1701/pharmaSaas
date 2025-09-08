import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Menu, X, Search } from 'lucide-react';
import SearchResults from './SearchResults';
import { isAuthenticated, getSession, signOut } from '@/auth/session';
import { toast } from '@/components/ui/sonner';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const authed = isAuthenticated();
  const session = getSession();

  const handleLogout = () => {
    signOut();
    toast("You have logged out.");
    navigate('/login', { replace: true });
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Research', href: '/research' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b shadow-soft"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-2xl font-bold text-foreground">PharmaSaas</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  to={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Search & Auth CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              {isSearchOpen ? (
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 transition-all duration-300"
                    autoFocus
                  />
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    <X size={16} />
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsSearchOpen(true)}
                  className="hover:bg-medical-gray-light transition-colors"
                >
                  <Search size={20} />
                </Button>
              )}
              <SearchResults query={searchQuery} isVisible={isSearchOpen && searchQuery.length > 0} />
            </motion.div>

            {/* Auth */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              {authed ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Hi, {session?.username}</span>
                  <Button variant="outline" onClick={handleLogout}>Logout</Button>
                </div>
              ) : (
                <Link to="/login">
                  <Button variant="default" className="bg-gradient-primary hover:shadow-medium transition-all duration-300">
                    Login
                  </Button>
                </Link>
              )}
            </motion.div>
          </div>

          {/* Mobile Menu & Search Buttons */}
          <div className="md:hidden flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search size={20} />
            </Button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <motion.div 
            className="md:hidden mt-4 pb-4 border-b"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
              autoFocus
            />
          </motion.div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav 
            className="md:hidden mt-4 pb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {authed ? (
                <Button variant="outline" className="mt-4 w-fit" onClick={() => { setIsMenuOpen(false); handleLogout(); }}>
                  Logout
                </Button>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-fit">
                  <Button variant="default" className="bg-gradient-primary mt-4 w-fit">Login</Button>
                </Link>
              )}
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;