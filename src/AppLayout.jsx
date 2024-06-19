import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";

function AppLayout() {
  return (
    <div className="max-h-screen h-screen text-base">
      <Navigation />
      <main className="h-max">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
