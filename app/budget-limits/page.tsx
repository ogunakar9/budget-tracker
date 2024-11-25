import DashboardLayout from "@/components/layouts/dashboard-layout";
import BudgetLimitPage from "@/components/custom/category/budget-limit";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <BudgetLimitPage />
    </DashboardLayout>
  );
}
