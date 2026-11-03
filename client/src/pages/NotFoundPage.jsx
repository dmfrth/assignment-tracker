import { Link } from "react-router-dom";

// shown when the url doesn't match any existing page
export default function NotFoundPage() {
  return (
    <section className="card">
      <h2>Page not found</h2>
      <p>That page doesn't exist.</p>
      <p>
        <Link to="/">Back to My Assignments</Link>
      </p>
    </section>
  );
}