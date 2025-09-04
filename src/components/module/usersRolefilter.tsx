import { HistoryFilterFormSchema } from "@/schema/userSchmea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import type z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const UsersRoleFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const role = searchParams.get("role");

  const form = useForm<z.infer<typeof HistoryFilterFormSchema>>({
    resolver: zodResolver(HistoryFilterFormSchema),
    defaultValues: {
      filter: "",
    },
  });

  useEffect(() => {
    form.reset({ filter: role || "" });
  }, [form, role]);

  function onSubmit(data: z.infer<typeof HistoryFilterFormSchema>) {
    // // eslint-disable-next-line no-console
    // console.log(data);
    const params = new URLSearchParams();
    params.set("role", data.filter);
    setSearchParams(params);
    // eslint-disable-next-line no-console
    console.log("Filtering: ", params.get("role"));
  }
  
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className=" flex gap-2">
            <FormField
              control={form.control}
              name="filter"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl className="">
                      <SelectTrigger className="cursor-pointer">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"AGENT"}>Agent</SelectItem>
                      <SelectItem value={"USER"}>User</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button
              className="cursor-pointer"
              variant={"default"}
              type="submit"
            >
              Filter
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default UsersRoleFilter;
