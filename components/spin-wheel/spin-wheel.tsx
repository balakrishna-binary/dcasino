import React, { useState } from "react";

import styles from "./../../styles/spin-wheel.module.css";

const spin_wheel_numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
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

type SpinWheelProps = {
  should_spin: boolean;
  result_number?: number;
};

const SpinWheel = ({ should_spin, result_number }: SpinWheelProps) => {
  const items = spin_wheel_numbers;
  const [selectedItem, setSelectItem] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [onSelectedItem, setOnSelectedItem] = useState({
    "--nb-item": items.length,
    "--selected-item": selectedItem,
  });

  React.useEffect(() => {
    setSpinning(should_spin);
  }, [should_spin]);

  React.useEffect(() => {
    setSelectItem(result_number);
    setOnSelectedItem({
      "--nb-item": items.length,
      "--selected-item": result_number,
    });
    setSpinning(false);
  }, [result_number]);

  return (
    <div className={styles["wheel-container"]}>
      <div
        className={`${styles["wheel"]} ${spinning && styles["spinning"]}`}
        // @ts-ignore
        style={onSelectedItem}
      >
        {items.map((item, index) => (
          <div
            className={styles["wheel-item"]}
            key={index}
            // @ts-ignore
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
