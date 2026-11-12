import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/widgets/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-background p-6 text-center">
      <div>
        <p className="text-sm font-semibold text-primary">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-3 text-muted-foreground">The requested Glucosebook page does not exist.</p>
        <Button asChild className="mt-6">
          <Link href="/"><ArrowLeft /> Return to dashboard</Link>
        </Button>
      </div>
    </main>
  );
}
