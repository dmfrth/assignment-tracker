import { Link } from "react-router-dom";

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