import React from "react";

import "./GroupsList.css";
import GroupCategory from "../../components/GroupCategory/GroupCategory";

function GroupsList({ groups, groupCategories }) {
  return (
    <div className="GroupsList">
      {groupCategories.map((cat) => (
        <GroupCategory
          name={cat}
          groupItems={groups.filter((group) => group.category == cat)}
        />
      ))}
    </div>
  );
}

export default GroupsList;
