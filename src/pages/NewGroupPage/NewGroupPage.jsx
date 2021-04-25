import React from "react";
import { useMediaQuery } from "react-responsive";
import "./NewGroupPage.css";
import Groups from "../../components/Groups/Groups";
import NewGroupForm from "../../components/NewGroupForm/NewGroupForm";

function NewGroupPage() {
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1223 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div className="NewGroupPage">
      {isDesktop && (
        <>
          <Groups />
          <NewGroupForm />
        </>
      )}
      {isTablet && (
        <>
          <Groups />
          <NewGroupForm />
        </>
      )}
      {isMobile && (
        <>
          <NewGroupForm />
        </>
      )}
    </div>
  );
}

export default NewGroupPage;
