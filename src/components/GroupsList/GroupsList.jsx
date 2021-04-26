import React from "react";

import "./GroupsList.css";
import GroupCategory from "../../components/GroupCategory/GroupCategory";

function GroupsList({ groups, groupCategories, setActiveGroup }) {
  return (
    <div className="GroupsList">
      {groupCategories.map((cat) => (
        <GroupCategory
          key={cat}
          name={cat}
          groupItems={groups.filter((group) => group.category === cat)}
          setActiveGroup={setActiveGroup}
        />
      ))}
    </div>
  );
}

export default GroupsList;
