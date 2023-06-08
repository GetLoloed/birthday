import {useState, useEffect} from 'react';
import styles from './Home.module.scss';
import {Navbar} from '@/components/Navbar/Navbar';
import hbround from '@/public/assets/svg/circle.svg';
import Image from 'next/image';
import {ImageContainer} from '@/components/ImageContainer/ImageContainer';
import {Name} from '@/components/Name/Name';
import {GetServerSideProps} from 'next';

interface Student {
    firstname: string;
    lastname: string;
}

interface HomeProps {
    studentsWithBirthdayToday: Student[];
}

const Home = ({studentsWithBirthdayToday}: HomeProps) => {
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const backgrounds = ['var(--pink)', 'var(--blue)', 'var(--green)', 'var(--yellow)'];

    useEffect(() => {
        // Mettre à jour le fond toutes les 5 secondes
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * backgrounds.length);
            setBackgroundIndex(randomIndex);
        }, 5000);

        return () => {
            // Nettoyer l'intervalle lorsque le composant est démonté
            clearInterval(interval);
        };
    }, []); // Dépendance vide pour s'assurer que l'effet ne se déclenche qu'une seule fois

    return (
        <>
            <Navbar/>
            <main className={styles.main}>
                <div className={styles.left} style={{backgroundColor: backgrounds[backgroundIndex]}}>
                    <Image src={hbround} alt={''}/>
                    <Name studentsWithBirthdayToday={studentsWithBirthdayToday}/>
                </div>
                <div className={styles.right}>
                    <ImageContainer/>
                </div>
            </main>
        </>
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
    const response = await fetch('http://localhost:3000/api/birthday');
    const data = await response.json();

    return {
        props: {
            studentsWithBirthdayToday: Array.isArray(data) ? data : [],
        },
    };
};
