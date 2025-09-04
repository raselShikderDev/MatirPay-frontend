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
import {
  transactionTypeText,
  TtransactionTypeValueBackend,
} from "@/constrants/constrants";
import { useEffect } from "react";

const TransactionTypeFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const type = searchParams.get("type") ;

  const form = useForm<z.infer<typeof HistoryFilterFormSchema>>({
    resolver: zodResolver(HistoryFilterFormSchema),
    defaultValues:{
        filter: ""
    }
  });

  useEffect(() => {
    form.reset({ filter: type || "" });
  }, [form, type]);

  function onSubmit(data: z.infer<typeof HistoryFilterFormSchema>) {
    // // eslint-disable-next-line no-console
    // console.log(data);
    const params = new URLSearchParams();
    params.set("type", data.filter);
    setSearchParams(params);
    // eslint-disable-next-line no-console
    console.log("params setted: ", params.get("type"));
  }

  // eslint-disable-next-line no-console
  console.log(type);
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
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl className="">
                      <SelectTrigger className="cursor-pointer">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={TtransactionTypeValueBackend.cashIn}>
                        {transactionTypeText.cashIn}
                      </SelectItem>
                      <SelectItem value={TtransactionTypeValueBackend.cashOut}>
                        {transactionTypeText.cashOut}
                      </SelectItem>
                      <SelectItem
                        value={TtransactionTypeValueBackend.sendMoney}
                      >
                        {transactionTypeText.sendMoney}
                      </SelectItem>
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

export default TransactionTypeFilter;
