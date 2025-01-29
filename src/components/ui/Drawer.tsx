import { MessageCircleQuestion, Film, X, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { MouseEventHandler, useEffect, useState } from "react";
import { IconButton } from "./IconButton";
import { useMediaQuery } from "../../hooks/useMediaQuery";

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
        isActive ? "bg-dark-100 " : "hover:bg-dark-200 hover:text-gray-200"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
}

export default function Drawer() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [isOpen, setIsOpen] = useState(isDesktop);
  const location = useLocation();

  // Update isOpen when screen size changes
  useEffect(() => {
    setIsOpen(isDesktop);
  }, [isDesktop]);

  const expandDrawer = isDesktop || isOpen;

  return (
    <>
      {/* Overlay for mobile ui when drawer is open */}
      {!isDesktop && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Toggle Button */}
      {!isDesktop && (
        <IconButton
          icon={isOpen ? <X /> : <Menu />}
          label={isOpen ? "Close menu" : "Open menu"}
          className="fixed top-4 left-4 z-30 p-2 rounded-lg bg-dark-200 shadow-lglg:hidden
             text-gray-50 hover:bg-dark-100"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        />
      )}

      {/* Side Drawer */}
      <div
        className={`fixed top-0 left-0 h-full bg-dark-200 transition-transform duration-300 transform z-30 
  ${
    !expandDrawer ? "-translate-x-full" : "translate-x-0"
  } w-64 border-r border-gray-700/30 shadow-[2px_0_8px_0_rgba(0,0,0,0.4)]`}
      >
        <div className="p-4">
          <nav className="space-y-2">
            <NavItem
              to="/quiz"
              icon={<MessageCircleQuestion className="w-5 h-5" />}
              label="Quiz Night"
              isActive={location.pathname === "/quiz"}
              onClick={() => !isDesktop && setIsOpen(false)}
            />
            <NavItem
              to="/movies"
              icon={<Film className="w-5 h-5" />}
              label="Stream Movies"
              isActive={location.pathname === "/movies"}
              onClick={() => !isDesktop && setIsOpen(false)}
            />
          </nav>
        </div>
      </div>
    </>
  );
}
