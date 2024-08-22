import { useState } from "react";
import "./App.css";
import SideBar from "./components/SideBar/Sidebar";

interface Dummy {
  id: string;
  text: string;
  time: string;
  color: string;
  lock: boolean;
}

const DUMMY_NOTES: Dummy[] = [
  {
    id: "n3",
    text: "Hey there, Add your note by clicking the plus icon and choosing the theme color",
    time: "Jul 28, 3:50 PM",
    color: "#FBA1A1",
    lock: false,
  },
  {
    id: "n2",
    text: "You can lock your note by clicking the lock icon and unlock with the same",
    time: "Jul 25, 8:00 PM",
    color: "#C4DFAA",
    lock: false,
  },
  {
    id: "n1",
    text: "You can delete your note too by clicking the delete icon. \n\nYes..Yes you can delete these instruction notes too",
    time: "Jul 18, 10:55 AM",
    color: "#F5F0BB",
    lock: false,
  },
];

const App = () => {
  const [notes, setNotes] = useState(
    // JSON.parse(localStorage.getItem("react-notes-app")) || DUMMY_NOTES,
    DUMMY_NOTES,
  );

  return (
    <>
      <div className="header">
        <h1>Minimal Notes</h1>
      </div>
      <div className="app">
        <SideBar setNotes={setNotes} />
      </div>
    </>
  );
};

export default App;
