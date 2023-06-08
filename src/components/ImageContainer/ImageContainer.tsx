import char1 from '@/public/assets/svg/character_1.svg';
import char2 from '@/public/assets/svg/character_2.svg';
import char3 from '@/public/assets/svg/character_3.svg';
import char4 from '@/public/assets/svg/character_4.svg';
import Image from 'next/image';
import styles from './ImageContainer.module.scss';

interface ImageContainerProps {
    character: number;
    background: string;
}

export function ImageContainer({ character, background }: ImageContainerProps) {
    const images = [char1, char2, char3, char4]; // Liste des images possibles
    const currentImage = images[character % images.length];

    return (
        <div className={styles.container} >
            <Image src={currentImage} alt={''} />
            <div className={styles.background} style={{ backgroundColor: background }}></div>
        </div>
    );
}
