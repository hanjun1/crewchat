import React from "react";
import "./DetailsOptionIcon.css";

function DetailsOptionIcon(props) {
  return (
    <>
      {props.name === "Participants" ? (
        <svg
          width="55"
          height="52"
          viewBox="0 0 55 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="55" height="52" rx="15" fill="#DADEFF" />
          <path
            d="M32 25C33.66 25 34.99 23.66 34.99 22C34.99 20.34 33.66 19 32 19C30.34 19 29 20.34 29 22C29 23.66 30.34 25 32 25ZM24 25C25.66 25 26.99 23.66 26.99 22C26.99 20.34 25.66 19 24 19C22.34 19 21 20.34 21 22C21 23.66 22.34 25 24 25ZM24 27C21.67 27 17 28.17 17 30.5V33H31V30.5C31 28.17 26.33 27 24 27ZM32 27C31.71 27 31.38 27.02 31.03 27.05C32.19 27.89 33 29.02 33 30.5V33H39V30.5C39 28.17 34.33 27 32 27Z"
            fill="black"
          />
        </svg>
      ) : props.name === "Events" ? (
        <svg
          width="55"
          height="52"
          viewBox="0 0 55 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="55" height="52" rx="15" fill="#DADEFF" />
          <path
            d="M33 26H28V31H33V26ZM32 15V17H24V15H22V17H21C19.89 17 19.01 17.9 19.01 19L19 33C19 34.1 19.89 35 21 35H35C36.1 35 37 34.1 37 33V19C37 17.9 36.1 17 35 17H34V15H32ZM35 33H21V22H35V33Z"
            fill="black"
          />
        </svg>
      ) : props.name === "Polls" ? (
        <svg
          width="55"
          height="52"
          viewBox="0 0 55 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="55" height="52" rx="15" fill="#DADEFF" />
          <path
            d="M35 17H21C19.9 17 19 17.9 19 19V33C19 34.1 19.9 35 21 35H35C36.1 35 37 34.1 37 33V19C37 17.9 36.1 17 35 17ZM25 31H23V24H25V31ZM29 31H27V21H29V31ZM33 31H31V27H33V31Z"
            fill="black"
          />
        </svg>
      ) : props.name === "Photos" ? (
        <svg
          width="55"
          height="52"
          viewBox="0 0 55 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="55" height="52" rx="15" fill="#DADEFF" />
          <g clip-path="url(#clip0)">
            <path
              d="M36 19H32.8L31 17H25L23.2 19H20C18.9 19 18 19.9 18 21V33C18 34.1 18.9 35 20 35H36C37.1 35 38 34.1 38 33V21C38 19.9 37.1 19 36 19ZM36 33H28V32C25.2 32 23 29.8 23 27C23 24.2 25.2 22 28 22V21H36V33ZM33 27C33 24.2 30.8 22 28 22V23.8C29.8 23.8 31.2 25.2 31.2 27C31.2 28.8 29.8 30.2 28 30.2V32C30.8 32 33 29.8 33 27ZM24.8 27C24.8 28.8 26.2 30.2 28 30.2V23.8C26.2 23.8 24.8 25.2 24.8 27Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(16 14)"
              />
            </clipPath>
          </defs>
        </svg>
      ) : props.name === "Documents" ? (
        <svg
          width="55"
          height="52"
          viewBox="0 0 55 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="55" height="52" rx="15" fill="#DADEFF" />
          <path
            d="M32 15H20C18.9 15 18 15.9 18 17V31H20V17H32V15ZM31 19L37 25V35C37 36.1 36.1 37 35 37H23.99C22.89 37 22 36.1 22 35L22.01 21C22.01 19.9 22.9 19 24 19H31ZM30 26H35.5L30 20.5V26Z"
            fill="black"
          />
        </svg>
      ) : (
        <h1>hello</h1>
      )}
    </>
  );
}

export default DetailsOptionIcon;
