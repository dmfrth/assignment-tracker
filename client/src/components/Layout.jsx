import { NavLink, Outlet } from "react-router-dom";

// this is the header, navigation, and footer that appear on every page
export default function Layout() {
  return (
    <>
      <header className="site-header">
        <div>
          <h1 className="brand">Assignment Tracker</h1>
          <p>Keep track of your assignments and deadlines.</p>
        </div>
        <nav className="nav" aria-label="Main navigation">
          <ul>
            <li>
              <NavLink to="/" end>My Assignments</NavLink>
            </li>
            <li>
              <NavLink to="/assignments/new">Add Assignment</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>Created by Danielle Forth and Ryan Sobocienski</p>
      </footer>
    </>
  );
}