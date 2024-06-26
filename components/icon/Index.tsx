import clsx from "clsx";
import * as Icons from "@/assets/icon";

export type IconName = keyof typeof Icons;

interface IconProps extends Pick<Icons.SVGIconProps, "className"> {
  iconName: IconName;
}

const Icon = ({ iconName, className, ...props }: IconProps) => {
  const IconComponent = Icons[iconName];
  const styles = clsx(
    "flex items-center justify-center",
    "w-8 h-0 p-0.5",
    className
  );
  return (
    <div className={styles}>
      <IconComponent className="m-auto" {...props} />
    </div>
  );
};

export default Icon;
