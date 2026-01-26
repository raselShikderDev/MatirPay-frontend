import { Card, CardContent } from "@/components/ui/card";

interface LegalItem {
  title: string;
  description: string;
}

interface LegalSectionProps {
  heading: string;
  subHeading?: string;
  items: LegalItem[];
  compact?: boolean; // used for homepage
}

export default function LegalSection({
  heading,
  subHeading,
  items,
  compact = false,
}: LegalSectionProps) {
  return (
    <section className={compact ? "py-12" : "py-20"}>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-10 text-center">
          <h1 className={compact ? "text-2xl font-bold" : "text-3xl font-bold"}>
            {heading}
          </h1>
          {subHeading && (
            <p className="text-muted-foreground mt-3">{subHeading}</p>
          )}
        </div>

        <div className="space-y-6">
          {items.map((item, index) => (
            <Card key={index} className="rounded-2xl bg-muted/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
