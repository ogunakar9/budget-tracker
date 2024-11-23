"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addIncome, addExpense } from "@/lib/features/budget/budgetSlice";
import { useAppDispatch } from "@/lib/hooks";

// Validation schema
const formSchema = z
  .object({
    type: z.enum(["income", "expense"]),
    description: z.string().min(1, "Description is required."),
    amount: z.number().positive("Amount must be greater than 0."),
    date: z.string().min(1, "Date is required."),
    category: z.string().optional(), // Required only for "expense"
  })
  .refine(
    (data) =>
      data.type === "income" ||
      (data.type === "expense" && data!.category!.length > 0),
    {
      message: "Category is required for expenses.",
      path: ["category"],
    }
  );

type FormValues = z.infer<typeof formSchema>;

export default function AddEntryForm() {
  const dispatch = useAppDispatch();
  const [type, setType] = useState<"income" | "expense">("income");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "income",
      description: "",
      amount: 0,
      date: "",
      category: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    const { type, description, amount, date, category } = values;

    if (type === "income") {
      dispatch(addIncome({ description, amount, date }));
    } else {
      dispatch(
        addExpense({ description, amount, date, category: category || "" })
      );
    }

    form.reset(); // Clear form after submission
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Add {type === "income" ? "Income" : "Expense"}
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
        >
          {/* Entry Type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Entry Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value as "income" | "expense");
                      setType(value as "income" | "expense");
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Amount */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter an amount"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category (only for expenses) */}
          {type === "expense" && (
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Add {type === "income" ? "Income" : "Expense"}
          </Button>
        </form>
      </Form>
    </>
  );
}
