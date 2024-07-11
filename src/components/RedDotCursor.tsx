// CursorComponent.jsx

import React, { useState } from 'react';
import styles from './css modules/RedDotCursor.module.css'; // Import CSS module for styling

const RedDotCursor = () => {
    const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });

    const handleMouseMove = (e) => {
        setCursorPosition({ x: e.pageX, y: e.pageY });
    };

    return (
        <div className={styles.container} onMouseMove={handleMouseMove}>
            <ul className={styles.navLinks}>
                <div className={styles.cursor} style={{ transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)` }}></div>
            </ul>
        </div>
    );
};

export default RedDotCursor;
