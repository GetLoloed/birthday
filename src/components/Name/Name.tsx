import styles from './Name.module.scss';

interface Student {
    firstname: string;
    lastname: string;
}

interface NameProps {
    student: Student;
}

export function Name({ student }: NameProps) {
    return (
        <h1 className={styles.title}>
            {student?.firstname} {student?.lastname}
        </h1>
    );
}
