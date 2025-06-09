import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronsUpDownIcon } from "lucide-react";

interface CommandSelectProps {
  options: Array<{
    id: string;
    value: string;
    children: ReactNode;
  }>;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value: string;
  placeholder?: string;
  isSearchable?: boolean;
  className?: string;
}

export const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  placeholder = "Select an option",
  className,
}: CommandSelectProps) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className={cn(
          "h-9 justify-between font-normal px-2",
          !selectedOption && "text-muted-foreground",
          className
        )}
        onClick={() => setOpen(true)}
      >
        <div>{selectedOption?.children ?? placeholder}</div>
        <ChevronsUpDownIcon />
      </Button>
      <CommandResponsiveDialog
        open={open}
        onOpenChange={setOpen}
        shouldFilter={false}
      >
        <CommandInput placeholder="Search..." onValueChange={onSearch} />
        <CommandList>
          <CommandEmpty>
            <span className="text-muted-foreground text-sm">
              No options found.
            </span>
          </CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.id}
                value={option.value}
                onSelect={(value) => {
                  onSelect(value);
                  setOpen(false);
                }}
              >
                {option.children}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
};
