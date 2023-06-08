import styles from './Navbar.module.scss'

export function Navbar() {
    const date = new Date();

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const today  = new Intl.DateTimeFormat('fr-FR', options).format(date);

    return (
        <nav className={styles.nav}>
            <h3 className={styles.text}>Citation et anniversaires</h3>
            <h3 className={styles.text}>{today}</h3>
        </nav>
    )
}
