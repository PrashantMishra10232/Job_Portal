import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef(({ className, checked, onCheckedChange, ...props }, ref) => {
  const [isChecked, setIsChecked] = React.useState(checked || false);

  React.useEffect(() => {
    setIsChecked(checked || false);
  }, [checked]);

  const handleClick = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onCheckedChange) {
      onCheckedChange(newChecked);
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow-xs transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        isChecked && "bg-primary text-primary-foreground",
        className
      )}
      onClick={handleClick}
      role="checkbox"
      aria-checked={isChecked}
      {...props}
    >
      {isChecked && (
        <Check className="h-4 w-4 text-primary-foreground" />
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };

