import { Menu, Film, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { MouseEventHandler, useState } from "react";
import Button from "./Button";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: MouseEventHandler<HTMLAnchorElement>;
}

function NavItem({ to, icon, label, isActive, onClick }: NavItemProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
        isActive
          ? "bg-primary-50 text-primary-600"
          : "text-secondary-500 hover:bg-gray-50"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
}

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-30 p-2 rounded-lg bg-white shadow-lg lg:hidden"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </Button>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-xl transition-transform duration-300 transform z-30 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64`}
      >
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800 mb-6">Menu</h1>
          <nav className="space-y-2">
            <NavItem
              to="/quiz"
              icon={<Menu className="w-5 h-5" />}
              label="Quiz Night"
              isActive={location.pathname === "/quiz"}
              onClick={() => setIsOpen(false)}
            />
            <NavItem
              to="/movies"
              icon={<Film className="w-5 h-5" />}
              label="Stream Movies"
              isActive={location.pathname === "/movies"}
              onClick={() => setIsOpen(false)}
            />
          </nav>
        </div>
      </div>
    </>
  );
}
