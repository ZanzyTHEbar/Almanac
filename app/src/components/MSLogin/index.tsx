/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";

export default function MSLogin({ handleLogin, state }) {
    return (
        <React.Fragment>
            <div className="card">
                <button
                    onClick={() => {
                        const popup = window.open(
                            "http://localhost:3000/auth/microsoft",
                            "targetWindow",
                            `toolbar=no,
                             location=no,
                             status=no,
                             menubar=no,
                             scrollbars=yes,
                             resizable=yes,
                             width=620,
                             height=700`
                        );

                        window.addEventListener("message", (event) => {
                            if (event.origin === "http://localhost:3000") {
                                if (event.data) {
                                    sessionStorage.setItem(
                                        "user",
                                        JSON.stringify(event.data)
                                    );
                                    popup?.close();
                                    handleLogin();
                                    sessionStorage.setItem(
                                        "loggedIn",
                                        JSON.stringify(state.login)
                                    );
                                }
                            }
                        });
                    }}
                >
                    LOGIN WITH MICROSOFT
                </button>
            </div>
        </React.Fragment>
    );
}
