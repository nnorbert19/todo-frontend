import NavbarComponent from "./components/NavbarComponent";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="min-vh-100 mx-auto main">
        <NavbarComponent />
        <section className="content d-flex justify-content-center align-items-center container">
          <Outlet />
        </section>
      </div>
    </>
  );
}

export default Layout;
