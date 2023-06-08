import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface Student {
    firstname: string;
    lastname: string;
}

interface BirthdayContextProps {
    children: ReactNode;
}

interface BirthdayProviderValue {
    studentsWithBirthdayToday: Student[];
}

export const BirthdayContext = createContext<BirthdayProviderValue | undefined>(
    undefined
);

export const BirthdayProvider = ({ children }: BirthdayContextProps) => {
    const [studentsWithBirthdayToday, setStudentsWithBirthdayToday] = useState<Student[]>([]);

    useEffect(() => {
        // Effectuez ici l'appel initial pour récupérer les données des anniversaires
        fetchBirthdayData();

        // Mettez en place une connexion WebSocket pour les mises à jour en temps réel
        const socket = new WebSocket('ws://localhost:3000/api/birthday');

        socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            if (areStudentsDifferent(data, studentsWithBirthdayToday)) {
                setStudentsWithBirthdayToday(data);
            }
        });

        // Nettoyer la connexion WebSocket lorsque le composant est démonté
        return () => {
            socket.close();
        };
    }, []);

    const fetchBirthdayData = () => {
        fetch('http://localhost:3000/api/birthday')
            .then((response) => response.json())
            .then((data) => {
                if (areStudentsDifferent(data, studentsWithBirthdayToday)) {
                    setStudentsWithBirthdayToday(data);
                }
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des données des anniversaires:', error);
            });
    };

    const areStudentsDifferent = (studentsA: Student[], studentsB: Student[]): boolean => {
        if (studentsA.length !== studentsB.length) {
            return true;
        }

        for (let i = 0; i < studentsA.length; i++) {
            if (studentsA[i].firstname !== studentsB[i].firstname || studentsA[i].lastname !== studentsB[i].lastname) {
                return true;
            }
        }

        return false;
    };

    return (
        <BirthdayContext.Provider value={{ studentsWithBirthdayToday }}>
            {children}
        </BirthdayContext.Provider>
    );
};
