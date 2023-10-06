import plusImg from "@assets/images/plus.svg";
import GlobalContext from "@src/context/GlobalContext";
import React, { useContext } from "react";
export default function CreateEventButton() {
    const { setShowEventModal } = useContext(GlobalContext);
    return (
        <button
            onClick={() => setShowEventModal(true)}
            className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl focus:bg-gray-100 transition duration-200 ease-in focus:shadow-inner"
        >
            <img
                src={plusImg}
                alt="create_event"
                className="plus-color w-7 h-7"
            />
            <span className="pl-3 pr-7"> Event</span>
        </button>
    );
}
