import { useState, useEffect } from 'react';
import char1 from '@/public/assets/svg/character_1.svg';
import char2 from '@/public/assets/svg/character_2.svg';
import char3 from '@/public/assets/svg/character_3.svg';
import char4 from '@/public/assets/svg/character_4.svg';
import Image from 'next/image';
import styles from './ImageContainer.module.scss'
export function ImageContainer() {
    const [currentImage, setCurrentImage] = useState(char1);
    const images = [char1, char2, char3, char4]; // Liste des images possibles

    useEffect(() => {
        // Changer l'image toutes les 5 secondes
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * images.length);
            setCurrentImage(images[randomIndex]);
        }, 5000);

        return () => {
            // Nettoyer l'intervalle lorsque le composant est démonté
            clearInterval(interval);
        };
    }, []); // Dépendance vide pour s'assurer que l'effet ne se déclenche qu'une seule fois

    return (
        <div className={styles.container}>
            <Image src={currentImage} alt={''} />
        </div>
    );
}
