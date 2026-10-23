import { useEffect } from "react";
import Favourites from "./components/Favourites/Favourites.jsx";

// body[data-task] is used by styles/base.css for this task's page background.
const TASK_ID = "2";

export default function App() {
  useEffect(() => {
    document.body.dataset.task = TASK_ID;
    return () => { delete document.body.dataset.task; };
  }, []);

  return (
    <main className="page">
      <div className="page-head">
        <span className="task-chip">Task 2</span>
        <h1 className="page-title">My Favourites</h1>
        <p className="page-sub">Select your favourite actor, actress and cricketer to show their recent photo in the matching box.</p>
      </div>
      <Favourites />
    </main>
  );
}
