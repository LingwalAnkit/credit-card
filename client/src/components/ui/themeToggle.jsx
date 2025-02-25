import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/themeSlice";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className={`p-2 rounded-full transition-all 
    ${
      darkMode
        ? "bg-black text-white hover:bg-gray-200 hover:text-black"
        : "bg-white text-black hover:bg-black hover:text-white"
    }`}
    >
      {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
    </button>
  );
};

export default ThemeToggle;
