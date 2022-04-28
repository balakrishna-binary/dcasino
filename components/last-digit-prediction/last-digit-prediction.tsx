import React from "react";

type LastDigitPredictionProps = {
  selected_digit?: number;
  onChange: (selected_digit: number) => void;
};

const part1 = [0, 1, 2, 3, 4];
const part2 = [5, 6, 7, 8, 9];

const LastDigitPrediction = ({
  selected_digit,
  onChange,
}: LastDigitPredictionProps) => {
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
        }

        .number-selector {
          margin-top: 12px;
          text-align: center;
        }

        .number-selector__row:first-child {
          margin-bottom: 8px;
        }

        .number-selector__selection {
          width: calc(20% - 4px);
          height: 24px;
          border-radius: 8px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          color: #333;
          cursor: pointer;
          border-radius: 3px;
        }

        .number-selector__selection:not(:first-child) {
          margin-left: 5px;
        }
        .number-selector__selection--selected {
          background-color: #d6dadb;
          color: #333;
          font-weight: 700;
        }
        .number-selector__selection:hover:not(&--selected) {
          cursor: pointer;
          background-color: #e6e9e9;
        }
        .number-selector__selection:last-child {
          margin-right: 0;
        }
      `}</style>
      <fieldset className="trade-container__fieldset">
        <div className="trade-container__fieldset-header center-text">
          <span className="trade-container__fieldset-info">
            Last Digit Prediction
          </span>
        </div>
        <div className="number-selector">
          <div className="number-selector__row">
            {part1.map((value) => (
              <span
                key={value}
                className={`number-selector__selection ${
                  value === selected_digit
                    ? "number-selector__selection--selected"
                    : ""
                }`}
                onClick={() => onChange(value)}
                data-value={value}
              >
                {value}
              </span>
            ))}
          </div>
          <div className="number-selector__row">
            {part2.map((value) => (
              <span
                key={value}
                className={`number-selector__selection ${
                  value === selected_digit
                    ? "number-selector__selection--selected"
                    : ""
                }`}
                onClick={() => onChange(value)}
                data-value={value}
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </fieldset>
    </React.Fragment>
  );
};

export default LastDigitPrediction;
