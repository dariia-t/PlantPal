import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Sprout, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Toaster } from "@/components/ui/toaster";

//general layout of the home about and search pages
export default function Layout() {
  const navItems = [
    { name: 'Home', href: '/home' },
    { name: 'About', href: '/about' },
    { name: 'Search', href: '/search' },
  ];
  const handleLogout = () => {
    localStorage.removeItem('auth_token');  
    localStorage.removeItem('id');  
  };
  return (
    <div className="flex flex-col min-h-screen font-mono">
      <header className="p-4 bg-gradient-to-r from-emerald-500 via-emerald-300 to-emerald-500 text-white">
        <div className="container mx-auto flex items-center justify-between" >
          <Link to="/home" className="flex items-center space-x-2 ">
            <Sprout className="h-6 w-6" />
            <span className="text-xl font-bold" >PlantPal</span>
          </Link>
          <NavigationMenu className="flex space-x-4">
            {navItems.map((item) => (
              <Button
                as={Link}
                key={item.name}
                variant="ghost"
              >
                <Link to={item.href}>{item.name}</Link>
              </Button>
            ))}
            
            <Button
                as={Link}
                variant="ghost"
                onClick={handleLogout}
              >
                <Link to="/">Logout</Link>
              </Button>
          </NavigationMenu>
        </div>
      </header>
      <main className="container flex-1">
        <Outlet />
      </main>
      <Toaster />
      <footer className="p-4 bg-gradient-to-r from-emerald-500 via-emerald-300 to-emerald-500  text-center text-white">
        &copy; {new Date().getFullYear()} PlantPal. All rights reserved.
      </footer>
    </div>
  );
}
