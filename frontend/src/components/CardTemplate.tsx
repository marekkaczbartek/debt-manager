interface CardTemplateProps {
    children: React.ReactNode;
    className?: string;
}

const CardTemplate: React.FC<CardTemplateProps> = ({ children, className }) => {
    const cardClassName = `flex flex-col items-center justify-center align-middle border-gray-300 border-2 text-black px-4 my-6 rounded-lg min-w-96 min-h-96 ${className}`;
    return <div className={cardClassName}>{children}</div>;
};

export default CardTemplate;
