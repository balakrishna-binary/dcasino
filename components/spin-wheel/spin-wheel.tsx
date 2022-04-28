import React, { useState } from "react";
import Emoji from "../emoji";

import styles from "./spin-wheel.module.css";

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
    items: string[];
};

const SpinWheel = ({ should_spin, result_number, items }: SpinWheelProps) => {
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
                        <Emoji label="emoji" symbol={item} size="48px" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpinWheel;
