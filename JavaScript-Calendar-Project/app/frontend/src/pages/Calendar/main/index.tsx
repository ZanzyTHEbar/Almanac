/* eslint-disable no-lone-blocks */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */

import CalendarHeader from "@components/CalendarHeader";
import EventModal from "@components/EventModal";
import { getMonthDays } from "@components/Helpers/utils";
import MSLogin from "@components/MSLogin";
import Month from "@components/Month";
import Sidebar from "@components/Sidebar";
import GlobalContext from "@src/context/GlobalContext";
import * as React from "react";
/* import styles from "./index.module.scss"; */

export function Main() {
    /* const [navState, setNavState] = React.useState({
        dashboard: true,
    });
        settings: false,

    const handleNavChange = (event) => {
        setNavState({
            ...navState,
            dashboard: !navState.dashboard,
            settings: !navState.settings,
        });
        console.log(event.currentTarget);
    }; */
    const [loggedIn, setLoggedIn] = React.useState({
        login: false,
    });

    const [currentMonth, setCurrentMonth] = React.useState(getMonthDays());
    const { monthIndex, showEventModal } = React.useContext(GlobalContext);

    React.useEffect(() => {
        setCurrentMonth(getMonthDays(monthIndex));
    }, [monthIndex]);

    const handleLogin = () => {
        setLoggedIn({
            ...loggedIn,
            login: !loggedIn.login,
        });
    };

    const Main = () => (
        <React.Fragment>
            {showEventModal && <EventModal />}
            <div className="h-screen flex flex-col">
                <CalendarHeader />
                <div
                    className="flex flex-1"
                    style={{
                        borderTopLeftRadius: "8px",
                        borderTopRightRadius: "8px",
                    }}
                >
                    <Sidebar />
                    <Month month={currentMonth} />
                </div>
            </div>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            {loggedIn.login ? (
                <Main />
            ) : (
                <MSLogin handleLogin={handleLogin} state={loggedIn} />
            )}
        </React.Fragment>
    );
}
