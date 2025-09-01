import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface Faq1Props {
  heading?: string;
  items?: FaqItem[];
}

const Faq = ({
  heading = "Frequently asked questions",
  items = [
    {
      id: "faq-1",
      question: "Who can use MatirWallet?",
      answer:
        "MatirWallet is built for two types of users: general Users and registered Agents. Users can send and receive money, while Agents help Users withdraw (cash out) or deposit (cash in) money into their wallet.",
    },
    {
      id: "faq-2",
      question: "How can I send money using MatirWallet?",
      answer:
        "If you're a User, you can send money to any other MatirWallet User instantly through the app. Agents cannot send or receive money — they only facilitate cash-in and cash-out.",
    },
    {
      id: "faq-3",
      question: "How do I withdraw (cash out) money from MatirWallet?",
      answer:
        "To withdraw money, a User must visit a registered MatirWallet Agent. The Agent will process the cash-out request, and the User will receive the equivalent cash in hand.",
    },
    {
      id: "faq-4",
      question: "Can I add money to my MatirWallet account myself?",
      answer:
        "No. Users cannot directly add money. Only registered Agents can perform cash-in operations to top up a User’s wallet. Visit a nearby Agent to deposit funds into your account.",
    },
    {
      id: "faq-5",
      question: "What can Agents do in MatirWallet?",
      answer:
        "Agents can perform two key tasks: (1) Cash In — deposit money into a User’s wallet, and (2) Cash Out — process a User’s withdrawal. Agents cannot send or receive money between users or other agents.",
    },
    {
      id: "faq-6",
      question: "Is there a fee for cash in or cash out?",
      answer:
        "There may be a small service charge for cash-out transactions, set by MatirWallet or the Agent. Cash-in is usually free, but this can depend on the Agent's policy. All fees are shown before confirming the transaction.",
    },
    {
      id: "faq-7",
      question: "How do I become a MatirWallet Agent?",
      answer:
        "To register as an Agent, you must apply through the MatirWallet website or contact our support team. Agents must meet certain requirements and go through a verification process.",
    },
  ],
}: Faq1Props) => {
  return (
    <section className="py-5 flex items-center justify-items-center justify-center">
      <div className="container max-w-5xl">
        <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-4xl">
          {heading}
        </h1>
        <Accordion type="single" collapsible>
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="font-semibold hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export { Faq };