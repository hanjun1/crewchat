import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./MessagesPage.css";
import Groups from "../../components/Groups/Groups";
import Messages from "../../components/Messages/Messages";
import ChatRoomDetails from "../../components/ChatRoomDetails/ChatRoomDetails";

function MessagesPage(props) {
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1223 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [showDetails, setShowDetails] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  return (
    <div className="MessagesPage">
      {isDesktop && (
        <>
          <Groups />
          <Messages />
          <ChatRoomDetails />
        </>
      )}
      {isTablet && (
        <>
          <Groups />
          {showDetails ? (
            <ChatRoomDetails
              showChatDetails={showDetails}
              setShowChatDetails={setShowDetails}
            />
          ) : (
            <Messages setShowDetails={setShowDetails} />
          )}
        </>
      )}
      {isMobile && (
        <>
          {showDetails ? (
            <ChatRoomDetails
              showChatDetails={showDetails}
              setShowChatDetails={setShowDetails}
            />
          ) : (
            <Messages setShowDetails={setShowDetails} />
          )}
        </>
      )}
    </div>
  );
}

export default MessagesPage;
