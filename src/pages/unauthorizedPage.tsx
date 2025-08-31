import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Protecting route
  useEffect(() => {
    if (location.state !== true) {
      navigate("/", { replace: true });
    }
  }, [location.state, navigate]);
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Card className="w-[400px] text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle>Unauthorized</CardTitle>
          <CardDescription>
            You don’t have permission to access this page.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button onClick={() => navigate("/")}>Go back home</Button>
          <Button variant="outline" onClick={() => navigate("/signin")}>
            Login with a valid account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
