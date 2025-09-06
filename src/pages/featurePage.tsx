import { ShieldCheck, Globe, Smartphone, Banknote } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturePage = () => {
  return (
    <main className="py-8 md:py-16 lg:py-20">
      <section className="container pb-14 mx-auto text-center px-4 md:px-0">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          Secure & Fast Digital Wallet in Bangladesh
        </h1>
        <p className="mt-4 text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Experience seamless payments, instant money transfers, and smart
          financial management—all from one powerful wallet app designed for
          Bangladesh.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/signup"
            className="rounded-2xl bg-primary px-6 py-3 text-white shadow-md hover:opacity-90 transition"
          >
            Get Started
          </Link>
          <Link
            to="/about"
            className="rounded-2xl border px-6 py-3 shadow-sm hover:bg-accent transition"
          >
            Learn More
          </Link>
        </div>
      </section>
      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-0 text-center">
          <p className="mb-2 text-sm text-muted-foreground lg:text-base">
            FEATURES
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium">
            What You Get
          </h2>
          <div className="mt-10 grid gap-6 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 justify-center">
            {[
              {
                icon: <ShieldCheck className="size-6 text-primary" />,
                title: "Bank-Grade Security",
                description:
                  "End-to-end encryption & biometric authentication for peace of mind.",
              },
              {
                icon: <Globe className="size-6 text-primary" />,
                title: "Nationwide Coverage",
                description:
                  "Works across all major banks, shops, and services in Bangladesh.",
              },
              {
                icon: <Banknote className="size-6 text-primary" />,
                title: "Instant Payments",
                description:
                  "Send and receive money instantly, 24/7—even on holidays.",
              },
              {
                icon: <Smartphone className="size-6 text-primary" />,
                title: "All-in-One App",
                description:
                  "Mobile recharge, utility bills, shopping & QR payments—everything in one app.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-background p-6 shadow hover:shadow-lg transition w-full sm:w-auto text-center"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center mx-auto">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 pb-10 md:py-24 text-center container mx-auto px-4 md:px-0">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Ready to Get Started?
        </h2>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
          Join thousands of users already enjoying the fastest and most secure
          digital wallet in Bangladesh.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/signup"
            className="rounded-2xl bg-primary px-8 py-3 text-white shadow-md hover:opacity-90 transition"
          >
            Create Account
          </Link>
          <Link
            to="/contact"
            className="rounded-2xl border px-8 py-3 shadow-sm hover:bg-accent transition"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
};

export default FeaturePage;
