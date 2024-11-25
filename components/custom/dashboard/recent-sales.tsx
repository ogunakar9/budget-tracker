"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Operation,
  selectLastFiveOperations,
} from "@/lib/features/budget/budgetSlice";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSelector } from "react-redux";

const SaleItem = ({ amount, date, description, type, category }: Operation) => {
  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarImage src="/avatars/01.png" alt="Avatar" />
        <AvatarFallback>
          {type === "income" ? (
            <ChevronUp className="text-green-500" />
          ) : (
            <ChevronDown className="text-red-500" />
          )}
        </AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        {category ? (
          <p className="text-sm font-medium leading-none">{category}</p>
        ) : null}
        <p className="text-sm font-medium leading-none">{description}</p>
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>
      <div className="ml-auto font-medium">$ {amount}</div>
    </div>
  );
};

export function RecentSales() {
  const lastFiveOperations = useSelector(selectLastFiveOperations);

  return (
    <div className="space-y-8">
      {lastFiveOperations?.map((operation, index) => (
        <SaleItem key={index} {...operation} />
      ))}
    </div>
  );
}
