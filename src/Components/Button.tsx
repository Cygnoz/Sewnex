// Path: components/Button.tsx
import { cva } from "class-variance-authority";
 
type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "tertiary" | "fourthiary";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  type?: "button" | "submit" | "reset";
  onSubmit?: (event: React.FormEvent<HTMLButtonElement>) => void; // Added onSubmit event type
};
const buttonVariants = cva("flex text-center items-center transition duration-250 ease-in-out", {
  variants: {
    variant: {
      primary:
        "bg-primary_main hover:bg-primary_hover active:bg-primary_active disabled:bg-primary_disabled rounded-full gap-2  border-gray-500 text-white",
      secondary:
        "bg-secondary_main hover:bg-secondary_hover active:bg-secondary_active disabled:bg-secondary_disabled rounded-full gap-2 border border-outlineButton_secondary text-outlineButton_secondary",
      tertiary:
        "bg-tertiary_main hover:bg-tertiary_hover active:bg-tertiary_active disabled:bg-tertiary_disabled rounded-full gap-2 border border-outlineButton_tertiary text-outlineButton_tertiary",
      fourthiary:
        "bg-fourthiary_main hover:bg-fourthiary_hover active:bg-fourthiary_active disabled:bg-fourthiary_disabled rounded-full gap-2 border border-gray-500 text-white",
    },
    size: {
      sm: "px-3 py-[10px] rounded-full",
      md: "px-5 py-2 rounded-full",
      lg: "px-7 py-3 rounded-full",
      xl: "px-9 py-4 rounded-full",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export default function Button({
  variant = "primary",
  size = "md",
  className = "p-4",
  type = "button",
  onSubmit, // Added onSubmit prop
  ...props
}: ButtonProps) {
  const combinedClassName = `${buttonVariants({ variant, size })} ${className}`;
 
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (type === "submit" && onSubmit) {
      onSubmit(event as any); // Cast to `any` to simulate `onSubmit` behavior
    }
 
    if (props.onClick) {
      props.onClick(event);
    }
  };
 
  return (
<button
      type={type}
      {...props}
      className={combinedClassName}
      onClick={handleClick} // Use handleClick to trigger onSubmit if type is "submit"
    />
  );
}
