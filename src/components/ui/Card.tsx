// components/ui/Card.tsx
interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "hoverable";
}

export default function Card({
  children,
  className = "",
  variant = "default",
}: CardProps) {
  return (
    <div
      className={`
        rounded-lg bg-dark-100 p-6 
        border border-gray-800/50 
        backdrop-blur-sm shadow-lg
        
        ${
          variant === "hoverable"
            ? "transition-transform duration-300 hover:scale-105"
            : ""
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}
