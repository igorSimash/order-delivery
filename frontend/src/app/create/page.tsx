import { Button } from "@/components/ui/button/Button";
import Link from "next/link";

export default function CreateRequestPage() {
  return (
    <main className="pt-16 flex flex-col gap-4">
      <div className="flex gap-3 justify-center items-center">
        <Button asChild size="lg">
          <Link href="/create/order">Create new Order</Link>
        </Button>
        <Button asChild size="lg">
          <Link href="/create/delivery">Create new Delivery</Link>
        </Button>
      </div>
      <Button asChild variant="link">
        <Link href="/dashboard">Go back to Dashboard</Link>
      </Button>
    </main>
  );
}
