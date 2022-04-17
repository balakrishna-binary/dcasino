import React, { useState } from "react";

import styles from "./../../styles/spin-wheel.module.css";

const colors = [
  "yellow",
  "red",
  "royalblue",
  "orangered",
  "purple",
  "lime",
  "magenta",
  "pink",
  "chartreuse",
  "aqua",
];

const SpinWheel = ({ items }) => {
  const [selectedItem, setSelectItem] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [onSelectedItem, setOnSelectedItem] = useState({
    "--nb-item": items.length,
    "--selected-item": selectedItem,
  });

  // to be replaced by api result
  const getRandomNumer = () => {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        const tempNumber = Math.floor(Math.random() * items.length);
        tempNumber ? resolve(tempNumber) : reject("Error");
      }, 500);
    });
  };

  const selectItem = () => {
    setSelectItem(null);
    setSpinning(false);
    setTimeout(() => {
      setSpinning(true);
    });

    getRandomNumer()
      .then((tempNumber) => {
        setSelectItem(tempNumber);
        setOnSelectedItem({
          "--nb-item": items.length,
          "--selected-item": tempNumber,
        });
      })
      .catch((err) => console.log(err));
    // to be replaced by api result
  };

  return (
    <div className={styles["wheel-container"]}>
      <div
        className={`${styles["wheel"]} ${spinning && styles["spinning"]}`}
        style={onSelectedItem}
        onClick={selectItem}
      >
        {items.map((item, index) => (
          <div
            className={styles["wheel-item"]}
            key={index}
            style={{ "--item-nb": index, "--wheel-item-color": colors[index] }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpinWheel;
