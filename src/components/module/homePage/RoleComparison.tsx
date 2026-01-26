import { Card } from "@/components/ui/card";

export function RoleComparison() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Built for Users & Agents
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 rounded-2xl bg-muted/10">
            <h3 className="text-xl font-semibold mb-4">Users</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Create and manage wallets</li>
              <li>• Send and receive payments</li>
              <li>• View transaction history</li>
              <li>• Manage profile and security</li>
            </ul>
          </Card>

          <Card className="p-6 rounded-2xl bg-muted/10">
            <h3 className="text-xl font-semibold mb-4">Agents</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Operate after admin approval</li>
              <li>• Assist customer transactions</li>
              <li>• Monitor balances and payments</li>
              <li>• Manage assigned customer accounts</li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}
