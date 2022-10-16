import * as React from "react";
import username from "../../../src-tauri/config/config.json";
import styles from "./index.module.scss";

export function Greeting() {
    const [name, setName] = React.useState("");

    React.useEffect(() => {
        setName(username.name);
    }, []);
    return (
        <>
            <div className={styles.username_div}>
                <p className={styles.username_content}>
                    {name ? `Welcome ${name}` : "Welcome"}
                </p>
            </div>
        </>
    );
}
