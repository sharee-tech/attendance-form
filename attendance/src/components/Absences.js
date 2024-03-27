import moment from "moment";
import Header from "./Header";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Absences() {
  const [absences, setAbsences] = useState([]);
  const [selected, setSelected] = useState([]);

  // function handleChecked(item) {
  //   setSelected([...selected, item]);
  // }

  // function selectedIds(selected) {
  //   return selected.map((member) => member.id);
  // }

  async function deleteAllAbsences() {
    const { error } = await supabase
      .from("absences")
      .delete()
      .neq("id", 0);
    if (error) {
      console.error("Error deleting absence:", error.message);
    } else {
      setAbsences([]);
    }
  }

  async function deleteAbsence(id) {
    const { error } = await supabase
      .from("absences")
      .delete()
      .eq("id", id);
    if (error) {
      console.error("Error deleting absence:", error.message);
    } else {
      setAbsences(absences.filter((absence) => absence.id !== id));
    }
  }

  useEffect(() => {
    getAbsences();
  }, []);

  async function getAbsences() {
    const { data } = await supabase
      .from("absences")
      .select()
      .order("date", { ascending: true });
    setAbsences(data);
    console.log(absences);
  }
  const groupedItems = groupItemsByYearAndMonth(absences);

  const renderItems = (items) => {
    return (
      <ul className="absences-list" style={{ listStyleType: "none" }}>
        {items.map((item) => (
          <li key={item.name}>
            <RemoveCircleOutlineIcon
              onClick={() => {
                if (window.confirm("Are you sure?")) {
                  deleteAbsence(item.id);
                }
              }}
              style={{ cursor: "pointer" }}
            />
            {Number(moment(item.date).format("DD"))} - {item.name}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <h1>Absences</h1>
      <div className="absences">
        {Object.entries(groupedItems).map(([yearMonth, items]) => (
          <>
            <h3>{yearMonth}</h3>
            {renderItems(items)}
          </>
        ))}
      </div>
      <button
        className="clear-all"
        onClick={() => {
          if (window.confirm("Are you sure?")) {
            deleteAllAbsences();
          }
        }}
      >
        Clear All Absences (end of year)
      </button>
    </>
  );
}

function groupItemsByYearAndMonth(items) {
  const grouped = {};

  items.forEach((item) => {
    const yearName = moment(item.date, "YYYY-MM-DD").format("YYYY");
    const monthName = moment(item.date, "YYYY-MM-DD").format("MMMM");
    const key = `${monthName} ${yearName}`;

    // if the key does not exists, we create it
    if (!grouped[key]) {
      grouped[key] = [];
    }

    grouped[key].push(item);
  });

  return grouped;
}
