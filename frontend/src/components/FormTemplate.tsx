interface FormTemplateProps {
    children: React.ReactNode;
    className?: string;
}

const FormTemplate: React.FC<FormTemplateProps> = ({ children, className }) => {
    const formClassName = `border-gray-300 border-2 text-black px-14 py-8 rounded-lg w-96 ${className}`;
    return <div className={formClassName}>{children}</div>;
};

export default FormTemplate;
