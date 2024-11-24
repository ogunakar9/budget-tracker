import { Input } from "@/components/ui/input";

export function Search({ ...props }: React.ComponentProps<typeof Input>) {
  return (
    <div className="w-full flex justify-center">
      <Input
        type="search"
        placeholder="Search..."
        className="lg:max-w-[50%]"
        {...props}
      />
    </div>
  );
}
