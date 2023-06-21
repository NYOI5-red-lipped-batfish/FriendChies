import React from "react";
import { useState, useEffect } from "react";
import SwipeCard from "../components/SwipeCard.js";

export default function SwipePage() {
  const [swipeDogs, setSwipeDogs] = useState();
  const [i, setI] = useState(0);

  // move through the array of dogs C
  const changeSwipeDog = () => {
    setI(i + 1)
  }

  useEffect(() => {
    const fetchSwipeDogs = async () => {
      try {
        const waitSwipeDogs = await fetch('http://localhost:3000/api/dogs');
        const usableSwipeDogs = await waitSwipeDogs.json(); 
        console.log('Swipe dogs array:', usableSwipeDogs)
        setSwipeDogs(usableSwipeDogs);
      }
      catch (err) {
        console.log('There was an error fetching data:', err)
      }
    };
    fetchSwipeDogs()
  }, []);

  return (
    <div>
      <h3>Swipe Page</h3>
      {/* prop drill an individual dog, and method to change the index C */}
      <SwipeCard dogInf={swipeDogs[i]} changeSwipeDog={changeSwipeDog} />
    </div>
  );
}

