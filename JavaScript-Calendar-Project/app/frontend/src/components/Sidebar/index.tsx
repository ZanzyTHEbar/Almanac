import CreateEventButton from "@components/CreateEventButton";
import Labels from "@components/Labels";
import SmallCalendar from "@components/SmallCalendar";
import React from "react";
export default function Sidebar() {
    return (
        <aside className="border p-5 w-64">
            <CreateEventButton />
            <SmallCalendar />
            <Labels />
        </aside>
    );
}
