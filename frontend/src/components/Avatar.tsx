
function getInitials(name: string) {
    name = name.trim();
    if (!name)
        return "AU";
    const nameParts = name.split(" ");
    if (nameParts.length > 1) {
        return nameParts[0][0].toUpperCase() + nameParts[nameParts.length - 1][0].toUpperCase();
    }
    else {
        return nameParts[0][0].toUpperCase();
    }
}

export const Avatar = ({ name, size }: { name: string, size?: 'small' | 'large' }) => {
  const nameInitials = getInitials(name);
  return (
    <div className={`relative inline-flex items-center justify-center ${size == 'small' ? 'w-8 h-8' : 'w-12 h-12'} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
      <span className={`${size == 'small' ? 'text-sm' : 'text-lg'} text-gray-600 dark:text-gray-300`}>{nameInitials}</span>
    </div>
  );
};
