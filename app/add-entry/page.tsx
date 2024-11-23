import AddEntryForm from "@/components/custom/AddEntryForm";

export default function AddEntryPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Add Income or Expense
        </h1>
        <AddEntryForm />
      </div>
    </div>
  );
}
