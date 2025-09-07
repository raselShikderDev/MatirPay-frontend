import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data: FormData) => {
    const dontShow = false
    try {
      if(dontShow){
       // eslint-disable-next-line no-console
       console.log(data);
     }
      
      setSubmitted(true);
      reset();
    } catch (error) {
       // eslint-disable-next-line no-console
       console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-semibold mb-6 text-center">Get in touch</h2>
      <p className="text-center text-muted-foreground mb-12">
        Have questions or feedback? Send us a message, and we'll get back to you shortly.
      </p>

      {submitted ? (
        <div className="rounded-lg bg-green-100 p-6 text-center text-green-900">
          Thank you for reaching out! We'll respond as soon as possible.
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
              Name
            </label>
            <Input
              id="name"
              placeholder="Your full name"
              {...register("name", { required: "Name is required" })}
              disabled={isSubmitting}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              disabled={isSubmitting}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
              Message
            </label>
            <Textarea
              id="message"
              rows={5}
              placeholder="Write your message here..."
              {...register("message", { required: "Message is required" })}
              disabled={isSubmitting}
            />
            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
          </div>

          <div className="text-center">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      )}
    </section>
  );
};

export default ContactPage
