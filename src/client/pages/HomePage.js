import React from "react";

const HomePage = () => {
  return (
    <div>
      <div>I'm the home HOT component</div>
      <button
        onClick={() => {
          console.log("Home page this is");
        }}
      >
        Click me
      </button>
    </div>
  );
};

export default { component: HomePage };
