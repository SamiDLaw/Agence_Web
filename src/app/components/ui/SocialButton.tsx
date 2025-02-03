interface SocialButtonProps {
  platform: string;
  link: string;
  className?: string;
}

const platformIcons: Record<string, string> = {
  twitter: 'fa-twitter',
  linkedin: 'fa-linkedin-in',
  github: 'fa-github',
  instagram: 'fa-instagram',
  vimeo: 'fa-vimeo-v',
  youtube: 'fa-youtube',
  facebook: 'fa-facebook-f',
};

export function SocialButton({ platform, link, className = '' }: SocialButtonProps) {
  const iconClass = platformIcons[platform] || `fa-${platform}`;
  
  return (
    <a
      href={link}
      className={`w-10 h-10 rounded-full flex items-center justify-center 
                 bg-white/10 hover:bg-blue-500/20 backdrop-blur-sm
                 text-gray-600 hover:text-blue-500 dark:text-gray-300
                 transition-all duration-300 ${className}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Suivez-nous sur ${platform}`}
    >
      <i className={`fab ${iconClass}`}></i>
    </a>
  );
}
