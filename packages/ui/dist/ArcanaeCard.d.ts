import React from 'react';
interface Arcanae {
    name: string;
    guardian_spirit: string;
    tradition_engine: string;
    core_teaching: string;
    science_correspondences: {
        frequency: number;
        color: string;
        crystal: string;
        geometry: string;
    };
    fusion_kink_abilities: string[];
    lab_environment: string;
    artistic_lineage: string;
}
interface ArcanaeCardProps {
    arcana: Arcanae;
    onSelect?: (arcana: Arcanae) => void;
    selected?: boolean;
}
export declare const ArcanaeCard: React.FC<ArcanaeCardProps>;
export {};
