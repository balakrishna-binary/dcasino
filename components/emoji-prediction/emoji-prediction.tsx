import React from "react";
import Emoji from "../emoji";

type EmojiPredictionProps = {
    items: string[];
    selected_emoji?: string;
    onChange: (selected_emoji: number) => void;
};

const EmojiPrediction = ({ items, selected_emoji, onChange }: EmojiPredictionProps) => {
    return (
        <React.Fragment>
            <style jsx>{`
                .trade-container__fieldset {
                    background-color: #f2f3f4;
                    border-color: #f2f3f4;
                    border-radius: 4px;
                    color: #333;
                    margin-bottom: 4px;
                    padding: 8px;
                }

                .trade-container__fieldset-info {
                    color: #333;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 1.5;
                    margin: auto;
                    text-align: left;
                    text-transform: none;
                    text-align: center;
                }

                .center-text {
                    text-align: center;
                }

                .emoji-selector {
                    margin-top: 12px;
                    text-align: center;
                }

                .emoji-selector__row:first-child {
                    margin-bottom: 8px;
                }

                .emoji-selector__selection {
                    width: 45px;
                    height: 45px;
                    border-radius: 8px;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #fff;
                    color: #333;
                    cursor: pointer;
                    border-radius: 3px;
                    margin: 3px;
                }

                .emoji-selector__selection:not(:first-child) {
                    margin-left: 5px;
                }
                .emoji-selector__selection--selected {
                    background-color: #d6dadb;
                    color: #333;
                    font-weight: 700;
                }
                .emoji-selector__selection:hover:not(&--selected) {
                    cursor: pointer;
                    background-color: #e6e9e9;
                }
                .emoji-selector__selection:last-child {
                    margin-right: 0;
                }
            `}</style>
            <fieldset className="trade-container__fieldset">
                <div className="trade-container__fieldset-header center-text">
                    <span className="trade-container__fieldset-info">Select Emoji</span>
                </div>
                <div className="emoji-selector">
                    <div className="emoji-selector__row">
                        {items.map((value) => (
                            <span
                                key={value}
                                className={`emoji-selector__selection ${
                                    value === selected_emoji
                                        ? "emoji-selector__selection--selected"
                                        : ""
                                }`}
                                onClick={() => {
                                    console.log(items.indexOf(value));
                                    onChange(items.indexOf(value));
                                }}
                                data-value={value}
                            >
                                <Emoji label="emoji" symbol={value} size="30px" />
                            </span>
                        ))}
                    </div>
                </div>
            </fieldset>
        </React.Fragment>
    );
};

export default EmojiPrediction;
