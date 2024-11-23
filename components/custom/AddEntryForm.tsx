"use client";

import { useState } from "react";
import { addIncome, addExpense } from "@/lib/features/budget/budgetSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { RootState } from "@/lib/store";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

export default function AddEntryForm() {
  const [type, setType] = useState<"income" | "expense">("income");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState(""); // Only for expenses

  const dispatch = useAppDispatch();
  const incomes = useAppSelector((state: RootState) => state.budget.incomes);
  const expenses = useAppSelector((state: RootState) => state.budget.expenses);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (type === "income") {
      dispatch(addIncome({ description, amount: parseFloat(amount), date }));
    } else {
      dispatch(
        addExpense({ description, amount: parseFloat(amount), date, category })
      );
    }

    // Clear the form
    setDescription("");
    setAmount("");
    setDate("");
    setCategory("");
  };

  console.log("incomes", incomes);
  console.log("expenses", expenses);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4"
    >
      {/* Entry Type Selector */}
      <div>
        <Label htmlFor="type">Entry Type</Label>
        <Select
          onValueChange={(value) => setType(value as "income" | "expense")}
          defaultValue={type}
        >
          <SelectTrigger>
            <SelectValue placeholder="Entry Type" />
          </SelectTrigger>
          <SelectContent className="w-full">
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a description"
          required
        />
      </div>

      {/* Amount */}
      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter an amount"
          required
        />
      </div>

      {/* Date */}
      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      {/* Category (only for expenses) */}
      {type === "expense" && (
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter a category"
            required
          />
        </div>
      )}

      {/* Submit Button */}
      <Button type="submit" className="w-full">
        Add {type === "income" ? "Income" : "Expense"}
      </Button>
    </form>
  );
}
