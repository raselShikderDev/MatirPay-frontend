import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const pricingData = [
  {
    title: "Send Money",
    description: "Transfer to another MatirWallet user.",
    regular: "৳5",
    offer: "৳3",
    note: "Per transaction",
  },
  {
    title: "Cash In",
    description: "Top-up your wallet via agent.",
    regular: "Free",
    offer: null,
    note: "No fees apply",
  },
  {
    title: "Cash Out",
    description: "Withdraw funds from an agent.",
    regular: "1.8%",
    offer: "1.5%",
    note: "Of withdrawal amount",
  },
];

export default function PricingPage() {
  return (
    <section className="py-20 px-6 bg-background text-foreground">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-semibold mb-4">MatirWallet Pricing</h2>
        <p className="text-muted-foreground">
          Here's a transparent breakdown of our current fees and special offers.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {pricingData.map((item, idx) => (
          <Card key={idx} className="border rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {item.title}
                {item.offer && (
                  <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                    Offer
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-2">
              <div className="text-4xl font-bold">
                {item.offer ? (
                  <>
                    <span className="line-through text-muted-foreground mr-2">{item.regular}</span>
                    <span className="text-green-600">{item.offer}</span>
                  </>
                ) : (
                  <>{item.regular}</>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{item.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center text-muted-foreground text-sm">
        <p>Offers are for a limited time and may change without prior notice.</p>
      </div>
    </section>
  );
}

