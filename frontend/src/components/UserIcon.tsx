export interface UserIconProps {
    username?: string;
    imageUrl?: string;
    className?: string;
}

const UserIcon: React.FC<UserIconProps> = ({
    username,
    imageUrl,
    className,
}) => {
    const firstLetter = username ? username.charAt(0).toUpperCase() : "?";

    return (
        <div className={`relative w-10 h-10 ${className}`}>
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={username}
                    className="w-10 h-10 rounded-full border-2 border-white"
                />
            ) : (
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-black text-xl border-2 border-black">
                    {firstLetter}
                </div>
            )}
        </div>
    );
};

export default UserIcon;
