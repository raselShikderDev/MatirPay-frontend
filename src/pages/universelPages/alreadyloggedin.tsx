
import { Loader2 } from "lucide-react";

export default function AlreadyLoggedIn() {


  return (
    <div className="flex flex-col items-center justify-center gap-3 py-4">
      <p className="text-center text-sm font-medium">
        You are already logged in
      </p>
      <p className="text-muted-foreground text-xs">
        Redirecting to home...
      </p>
      <Loader2 className="h-5 w-5 animate-spin text-primary" />
    </div>
  );
}
