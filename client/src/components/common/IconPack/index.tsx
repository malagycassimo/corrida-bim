interface ComponentProps {
    width?: number;
    height?: number;
    stroke?: string;
    fill?: string;
}

export const IconPack: Record<string, React.FC<ComponentProps>> = {
    ArrowRight: ({
        width = 14,
        height = 15,
        stroke = "white",
        fill = "none",
    }) => (
        <svg
            width={width}
            height={height}
            viewBox="0 0 14 15"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M6.86523 2.69424L11.8998 7.49999L6.86523 12.3057"
                stroke={stroke}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M11.9 7.5L2.1001 7.5"
                stroke={stroke}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    ),
};

export const IconPackWrapper: React.FC<
    ComponentProps & { componentName: keyof typeof IconPack }
> = ({ componentName, ...props }) => {
    const Component = IconPack[componentName];
    return <Component {...props} />;
};
