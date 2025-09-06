import { Button } from "@/components/ui/button";
import { Timer, Zap, ZoomIn } from "lucide-react";
import bankImg from "@/assets/bank.jpg"
import atmBtn from "@/assets/atm-button.jpg"

interface About3Props {
  title?: string;
  description?: string;
  mainImage?: {
    src: string;
    alt: string;
  };
  secondaryImage?: {
    src: string;
    alt: string;
  };
  breakout?: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  companiesTitle?: string;
  companies?: Array<{
    src: string;
    alt: string;
  }>;
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{
    label: string;
    value: string;
  }>;
}

const defaultCompanies = [
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-1.svg",
    alt: "Arc",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg",
    alt: "Descript",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg",
    alt: "Mercury",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-4.svg",
    alt: "Ramp",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-5.svg",
    alt: "Retool",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-6.svg",
    alt: "Watershed",
  },
];

const defaultAchievements = [
  { label: "Companies Supported", value: "300+" },
  { label: "Projects Finalized", value: "800+" },
  { label: "Happy Customers", value: "99%" },
  { label: "Recognized Awards", value: "10+" },
];

const AboutPage = ({
  title = "About MatirWallet",
  description = "MatirWallet is a secure and inclusive digital wallet built for the people of Bangladesh. From sending money to friends and family, to withdrawing cash via agents, we make financial transactions simple, reliable, and accessible for everyone.",

  mainImage = {
    src: bankImg,
    alt: "MatirWallet user interface",
  },

  secondaryImage = {
    src: atmBtn,
    alt: "MatirWallet agent helping customer",
  },

  breakout = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
    alt: "MatirWallet logo",
    title: "Empowering digital finance in every corner of Bangladesh",
    description:
      "MatirWallet connects users and agents in a seamless ecosystem. Agents enable cash-ins and cash-outs, while users enjoy fast, secure, and hassle-free transactions — all from their phones.",
    buttonText: "Explore how it works",
    buttonUrl: "#how-it-works", // You can update this with your actual route or link
  },

  companiesTitle = "Trusted by communities and partners nationwide",

  achievementsTitle = "MatirWallet at a Glance",

  achievementsDescription = "With thousands of active users and agents, MatirWallet is transforming the way Bangladesh handles everyday transactions — one tap at a time.",

  companies = defaultCompanies,
  achievements = defaultAchievements,
}: About3Props = {}) => {
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-0 text-center">
          <p className="mb-2 text-sm text-muted-foreground lg:text-base">
            OUR VALUES
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium">
            Why Choose Us?
          </h2>
          <div className="mt-10 grid gap-6 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 justify-center">
            {[
              {
                icon: <Timer className="size-6 text-primary" />,
                title: "Performance",
                description:
                  "Lightning-fast transactions with zero delays—whether paying bills, shopping, or sending money to loved ones.",
              },
              {
                icon: <ZoomIn className="size-6 text-primary" />,
                title: "Quality",
                description:
                  "A reliable, secure, and user-friendly app tested to handle millions of users across Bangladesh.",
              },
              {
                icon: <Zap className="size-6 text-primary" />,
                title: "Innovation",
                description:
                  "AI-powered fraud detection, smart expense tracking, and biometric login for next-level security.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-accent p-6 shadow hover:shadow-lg transition w-full sm:w-auto text-center"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center mx-auto">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-32">
        <div className="container mx-auto px-4">
          {/* Title + Description */}
          <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
              {title}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto md:mx-0">
              {description}
            </p>
          </div>

          <div className="grid gap-7 lg:grid-cols-3">
            <img
              src={mainImage.src}
              alt={mainImage.alt}
              className="w-full max-h-[620px] rounded-xl object-cover lg:col-span-2"
            />
            <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
              {/* Card */}
              <div className="flex flex-col justify-between gap-6 rounded-xl bg-muted p-7 w-full md:w-1/2 lg:w-full">
                <img
                  src={breakout.src}
                  alt={breakout.alt}
                  className="h-12 mx-auto md:mx-0 hidden"
                />
                <div className="text-center md:text-left">
                  <p className="mb-2 text-lg font-semibold">{breakout.title}</p>
                  <p className="text-muted-foreground">
                    {breakout.description}
                  </p>
                </div>
                <div className="flex justify-center md:justify-start">
                  <Button variant="outline" asChild>
                    <a href={breakout.buttonUrl} target="_blank">
                      {breakout.buttonText}
                    </a>
                  </Button>
                </div>
              </div>
              <img
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                className="rounded-xl object-cover w-full md:w-1/2 lg:w-full"
              />
            </div>
          </div>
          <div className="py-32">
            <p className="text-center">{companiesTitle}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-8">
              {companies.map((company, idx) => (
                <div
                  className="flex items-center gap-3"
                  key={company.src + idx}
                >
                  <img
                    src={company.src}
                    alt={company.alt}
                    className="h-6 w-auto md:h-8"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-muted p-10 md:p-16">
            <div className="flex flex-col gap-4 text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl font-semibold">
                {achievementsTitle}
              </h2>
              <p className="max-w-xl mx-auto md:mx-0 text-muted-foreground">
                {achievementsDescription}
              </p>
            </div>

            <div className="mt-10 flex flex-wrap justify-center md:justify-between gap-10 text-center">
              {achievements.map((item, idx) => (
                <div className="flex flex-col gap-4" key={item.label + idx}>
                  <p className="text-muted-foreground">{item.label}</p>
                  <span className="text-3xl sm:text-4xl font-semibold md:text-5xl">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute -top-1 right-1 z-10 hidden h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom_right,#000,transparent,transparent)] bg-[size:80px_80px] opacity-15 md:block"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
