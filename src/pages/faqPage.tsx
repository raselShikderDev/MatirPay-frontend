import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
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
];

const FaqPage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero / Page Heading */}
      <section className="py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find quick answers to common questions about using MatirWallet. If you
          don’t see your question here, please reach out to our support team.
        </p>
      </section>

      <section className="py-12 px-4 flex items-center justify-center">
        <div className="container max-w-4xl">
          <Accordion type="single" collapsible>
            {faqData.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="font-medium hover:no-underline text-lg">
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
      <section className="py-16 px-4 bg-muted text-center">
        <h2 className="text-2xl font-semibold mb-4">Still need help?</h2>
        <p className="mb-6 text-muted-foreground">
          Can’t find the answer you’re looking for? Please contact our support
          team and we’ll be happy to assist you.
        </p>
        <Link
          to="/contact"
          className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition"
        >
          Contact Support
        </Link>
      </section>
    </main>
  );
};

export default FaqPage;
