import { Dashboard } from "@/components/pages/Dashboard";
import { Button } from "@/components/ui/button/Button";
import Link from "next/link";
export default function DashboardPage() {
  return (
    <main className="p-4 md:p-6 flex flex-col gap-3">
      <Button asChild>
        <Link
          href="/create"
          className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md w-fit"
        >
          Create new Request
        </Link>
      </Button>

      <Dashboard />
    </main>
  );
}
