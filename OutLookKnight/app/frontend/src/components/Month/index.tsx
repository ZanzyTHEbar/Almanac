import Day from "@components/Day";
import React from "react";

export default function Month({ month }) {
    return (
        <div
            className="flex-1 grid grid-cols-7 grid-rows-6"
            style={{
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
                gap: "3px",
                padding: "3px",
            }}
        >
            {month.map((row, i) => (
                <React.Fragment key={i}>
                    {row.map((day, j) => (
                        <Day day={day} key={j} rowIdx={i} />
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
}
