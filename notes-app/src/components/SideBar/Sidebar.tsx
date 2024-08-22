import { useState } from "react";
import "./SideBar.css";
import addImage from "../../assets/add.png";

const colorList = [
  "#C4DFAA",
  "#F5F0BB",
  "#D6EFED",
  "#FBA1A1",
  "#DCD6F7",
  "#FFC7C7",
];

interface SideBarProps {
  // setNotes: (arg0: string[]) => void;
  setNotes: (note: object[]) => object[];
}

const SideBar = ({ setNotes }: SideBarProps) => {
  const [isListOpen, setIsListOpen] = useState(false);

  const addNoteHandler = (themeColor: string) => {
    const note = {
      id: Date.now() + "" + Math.floor(Math.random() * 78),
      text: "",
      time: new Date().toLocaleDateString("en-US", {
        hourCycle: "h12",
        minute: "2-digit",
        day: "2-digit",
        month: "short",
        hour: "2-digit",
      }),
      color: themeColor,
      lock: false,
    };

    setNotes((prevNotes: object[]) => {
      return [note, ...prevNotes];
    });
  };

  return (
    <div className="sidebar">
      <img
        className="sidebar__add-img"
        src={addImage}
        alt="add image"
        onClick={() => setIsListOpen(!isListOpen)}
      />

      <ul
        className={`sidebar__colorlist ${isListOpen ? "sidebar__colorlist_active" : ""}`}
      >
        {isListOpen &&
          colorList.map((color: string, index: number) => (
            <li
              className="sidebar__colorlist_color"
              key={index}
              style={{ backgroundColor: color }}
              onClick={() => addNoteHandler(color)}
            ></li>
          ))}
      </ul>
    </div>
  );
};

export default SideBar;
