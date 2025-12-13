export declare const theme: {
    colors: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
        accent: string;
        sacred: {
            gold: string;
            ether: string;
            void: string;
        };
    };
    typography: {
        fontFamily: string;
        fontSize: {
            sm: string;
            md: string;
            lg: string;
            xl: string;
            '2xl': string;
        };
    };
    spacing: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    borderRadius: {
        sm: string;
        md: string;
        lg: string;
        full: string;
    };
    animation: {
        transition: string;
        breathing: string;
    };
};
export type Theme = typeof theme;
