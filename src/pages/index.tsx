import {useState, useEffect} from 'react';
import styles from './Home.module.scss';
import {Navbar} from '@/components/Navbar/Navbar';
import hbround from '@/public/assets/svg/circle.svg';
import Image from 'next/image';
import {ImageContainer} from '@/components/ImageContainer/ImageContainer';
import star from '@/public/assets/svg/star.svg';
import {Name} from '@/components/Name/Name';
import {GetServerSideProps} from 'next';
import {BirthdayProvider} from "@/contexts/BirthdayProvider";

interface Student {
    firstname: string;
    lastname: string;
}

interface HomeProps {
    studentsWithBirthdayToday: Student[];
}

const backgrounds = ['var(--pink)', 'var(--blue)', 'var(--green)', 'var(--yellow)'];

const Home = ({ studentsWithBirthdayToday }: HomeProps) => {
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const [secondCount, setSecondCount] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSecondCount((prev) => (prev === 50 ? 0 : prev + 1));
        }, 100);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (secondCount === 0) {
            const randomIndex = Math.floor(Math.random() * backgrounds.length);
            setBackgroundIndex(randomIndex);
            setCurrentIndex((prev) => (prev + 1) % studentsWithBirthdayToday.length);
        }
    }, [secondCount, studentsWithBirthdayToday]);

    return (
        <BirthdayProvider>
            <Navbar />
            <main className={styles.main}>
                <div
                    className={styles.left}
                    style={{ backgroundColor: backgrounds[backgroundIndex] }}
                >
                    <div className={styles.circle}>
                        <Image src={hbround} alt={''} />
                    </div>
                    <div className={styles.circlebg}></div>
                    <div
                        className={styles.circlebgRandom}
                        style={{ backgroundColor: backgrounds[backgroundIndex] }}
                    ></div>
                    <Image
                        className={styles.star1}
                        src={star}
                        alt={''}
                        width={79}
                        height={79}
                    />
                    <Image
                        className={styles.star2}
                        src={star}
                        alt={''}
                        width={79}
                        height={79}
                    />
                    <Image
                        className={styles.star3}
                        src={star}
                        alt={''}
                        width={79}
                        height={79}
                    />
                    <Name student={studentsWithBirthdayToday[currentIndex]} />
                </div>
                <div className={styles.right}>
                    <ImageContainer character={currentIndex} background={backgrounds[backgroundIndex]} />

                    <div className={styles.progressContainer}>
                        <div className={styles.number}>
                            {Math.floor(secondCount / 10).toString().padStart(2, '0')}
                        </div>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progress}
                                style={{
                                    width: `${(secondCount / 50) * 100}%`,
                                    backgroundColor: backgrounds[backgroundIndex],
                                }}
                            />
                        </div>
                        <div className={styles.number}>05</div>
                    </div>
                </div>
            </main>
        </BirthdayProvider>
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
