/* eslint-disable no-console */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { profileUpdateFormZodSchema } from "@/schema/userSchmea";
import {
  useGetMeQuery,
  useUpdateUserMutation,
} from "@/redux/features/users/user.api";
import ProfileUpdatedConfirmMessage from "@/components/module/universal/ProfileUpdatedConfirmMessage";
import { useState } from "react";
import { LoadingSpinner } from "@/components/loading";
import type { IUpdateUser } from "@/types";
import { ProfileUpdateConfirmationModal } from "@/components/module/universal/profileUpdateConfirmationModal";

interface UpdateProfileProps {
  heading?: string;
}

const UpdateProfilePage = ({
  heading = "Update Profile Info",
}: UpdateProfileProps) => {
  const [confirmStatus, setConfirmStatus] = useState<boolean>(false);
  const [isShowForm, setIsShowForm] = useState<boolean>(true);
  // Hooks
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { data: myData, isLoading: myDataLoading } = useGetMeQuery(null);
  const [payload, setPayload] = useState<IUpdateUser | null>(null);

  // default values
  const form = useForm<z.infer<typeof profileUpdateFormZodSchema>>({
    resolver: zodResolver(profileUpdateFormZodSchema),
    mode: "onChange",
    defaultValues: {
      name: myData?.data.name,
      phone: myData?.data.phone,
      address: myData?.data.address,
    },
  });

  //Handling onsubmit
  const onSubmit = async (
    value: z.infer<typeof profileUpdateFormZodSchema>
  ) => {
    console.log(value);

    setPayload({
      name: value.name,
      phone: value.phone,
      address: value.address,
    });
  };

  const updateProfile = async () => {
    if (!payload) {
      return;
    }
    try {
      const res = await updateUser(payload).unwrap();
      console.log(res.data);
      if (res.success) {
        const toastId = toast.loading("Updating profile...");
        toast.success("Successfully Profile updated", { id: toastId });
        setConfirmStatus(true);
        setIsShowForm(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      setIsShowForm(false);
      toast.error("Updating profile falied");
    }
  };

  return (
    <section className="bg-muted h-screen dark:bg-blue-950/50">
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-20 lg:justify-start">
          <div className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-5 py-10 shadow-md dark:bg-gray-900">
            {heading && <h1 className="text-xl font-semibold">{heading}</h1>}
            {isLoading && !isShowForm && <LoadingSpinner />}
            {!isShowForm && (
              <ProfileUpdatedConfirmMessage
                status={confirmStatus}
                setIsShowForm={() => setIsShowForm(true)}
              />
            )}
            {isShowForm && (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input required placeholder="Full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input required placeholder="Your Phone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            required
                            placeholder="Full address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <Button
                  disabled={isLoading && myDataLoading}
                  className="cursor-pointer"
                  type="submit"
                >
                  Update
                </Button> */}
                  {payload ? (
                    <ProfileUpdateConfirmationModal
                      onConfirm={() => updateProfile()}
                      data={{
                        name: payload.name,
                        phone: payload.phone,
                        address: payload.address,
                      }}
                    >
                      <Button
                        className="cursor-pointer dark:text-white"
                        type="submit"
                        variant={"default"}
                        disabled={isLoading}
                      >
                        Update
                      </Button>
                    </ProfileUpdateConfirmationModal>
                  ) : (
                    <Button
                      disabled={isLoading && myDataLoading}
                      className="cursor-pointer dark:text-white"
                      type="submit"
                      variant={"default"}
                    >
                      Update
                    </Button>
                  )}
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateProfilePage;
