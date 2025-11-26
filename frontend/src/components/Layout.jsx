import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="grid grid-cols-12 gap-4 px-6 pb-6">
        <div className="col-span-12 md:col-span-3 lg:col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-12 md:col-span-9 lg:col-span-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
