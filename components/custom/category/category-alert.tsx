"use client";

import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Alert } from "@/components/ui/alert";

export function CategoryAlertsDialog() {
  const { categoryWarnings, categoryLimits } = useAppSelector(
    (state: RootState) => state.category
  );

  const warnings = Object.entries(categoryWarnings)
    .filter(([_, warning]) => warning)
    .map(([category]) => ({
      category,
      limit: categoryLimits[category],
    }));

  return (
    <AlertDialog>
      <AlertDialogTrigger className="btn btn-secondary">
        View Warnings
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Category Warnings</AlertDialogTitle>
          <AlertDialogDescription>
            {warnings.length > 0 ? (
              <ul>
                {warnings.map(({ category, limit }) => (
                  <li key={category} className="mb-4">
                    <Alert variant="destructive">
                      <strong>{category}</strong> has exceeded 80% of its limit
                      (${limit}).
                    </Alert>
                  </li>
                ))}
              </ul>
            ) : (
              <span>No warnings at the moment.</span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
