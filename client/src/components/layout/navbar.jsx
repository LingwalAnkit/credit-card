import { Box } from "lucide-react";
import ThemeToggle from "../ui/themeToggle";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-16 py-8 mb-2">
      <div className="flex items-center gap-2">
        <Box className="size-8" />
        <div className="flex flex-col gap-4">
          <span className="tracking-tighter text-3xl font-extrabold text-primary flex gap-2 items-center">
            Kosh{" "}
          </span>
        </div>
      </div>
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;