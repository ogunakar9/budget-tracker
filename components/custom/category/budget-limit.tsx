"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setCategoryLimit } from "@/lib/features/category/categorySlice";
import { RootState } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BudgetLimitsPage() {
  const dispatch = useDispatch();
  const { categoryLimits } = useSelector((state: RootState) => state.category);
  const [newLimit, setNewLimit] = useState({ category: "", limit: "" });

  const handleSetLimit = () => {
    if (newLimit.category && newLimit.limit) {
      dispatch(
        setCategoryLimit({
          category: newLimit.category,
          limit: parseFloat(newLimit.limit),
        })
      );
      setNewLimit({ category: "", limit: "" });
    }
  };

  return (
    <div className="budget-limits-page">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Budget Limits</h1>
        <p>Manage your spending limits for each category.</p>
      </header>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">Set a New Limit</h2>
        <div className="flex gap-4">
          <Input
            placeholder="Category (e.g., Food)"
            value={newLimit.category}
            onChange={(e) =>
              setNewLimit({ ...newLimit, category: e.target.value })
            }
          />
          <Input
            type="number"
            placeholder="Limit (e.g., 500)"
            value={newLimit.limit}
            onChange={(e) =>
              setNewLimit({ ...newLimit, limit: e.target.value })
            }
          />
          <Button onClick={handleSetLimit}>Set Limit</Button>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Current Limits</h2>
        {Object.entries(categoryLimits).length > 0 ? (
          <ul>
            {Object.entries(categoryLimits).map(([category, limit]) => (
              <li key={category} className="mb-2">
                <strong>{category}:</strong> ${limit}
              </li>
            ))}
          </ul>
        ) : (
          <p>No limits set yet.</p>
        )}
      </section>
    </div>
  );
}
