import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { IconName } from "@/components/icon/Index";
import Icon from "@/components/icon/Index";
interface ButtonProps extends HTMLMotionProps<"button"> {
  iconName?: IconName;
  text?: string;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  iconClassName?: string;
  name?: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}
const Button = ({
  className,
  text,
  onClick,
  type,
  iconName,
  loading,
  iconClassName,
  ...otherProps
}: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`${className} flex items-center gap-2 rounded-button`}
      type={type}
      {...otherProps}
    >
      {iconName && (
        <Icon iconName={`${iconName}`} className={`${iconClassName} `} />
      )}
      {loading && (
        <motion.svg
          width="24"
          className="animate-spin"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <motion.path
            opacity="0.2"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            fill="#ffffff"
          />
          <motion.path
            d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
            fill="#ffffff"
          />
        </motion.svg>
      )}
      {text}
    </motion.button>
  );
};

/* Button.defaultProps = {
  icon: null,
  onClick: null,
}; */

export default Button;
