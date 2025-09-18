// src/components/Navbar.jsx
import { CheckCircle2 } from "lucide-react";

const Navbar = ({ taskCount }) => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">TaskFlow</h1>
          </div>
          <div className="text-sm text-gray-500">{taskCount || 0} tasks</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
