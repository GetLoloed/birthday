import {useState, useEffect} from 'react';
import styles from './Name.module.scss';

interface Student {
    firstname: string;
    lastname: string;
}

interface NameProps {
    studentsWithBirthdayToday: Student[];
}

export function Name({studentsWithBirthdayToday}: NameProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    console.log(studentsWithBirthdayToday);
    useEffect(() => {
        // Changer l'index toutes les 5 secondes
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % studentsWithBirthdayToday.length);
        }, 5000);

        return () => {
            // Nettoyer l'intervalle lorsque le composant est démonté
            clearInterval(interval);
        };
    }, [studentsWithBirthdayToday]);

    return (
        <h1 className={styles.title}>{studentsWithBirthdayToday[currentIndex]?.firstname} {studentsWithBirthdayToday[currentIndex]?.lastname}</h1>
    );
}
