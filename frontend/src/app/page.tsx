import { Button } from "@/components/ui/button/Button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-56px)] items-center justify-center gap-10 p-24">
      <Button asChild size="lg">
        <Link href="/sign-up">Sign Up</Link>
      </Button>
      <Button asChild size="lg">
        <Link href="/sign-in">Sign In</Link>
      </Button>
    </main>
  );
}
