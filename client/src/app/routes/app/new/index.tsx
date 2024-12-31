import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ConfirmationAlertDialog from "./confirmation-alert-dialog";
import { useState } from "react";
import { getVariables } from "@/lib/get-variables";
import { useMutation } from "@tanstack/react-query";
import { create } from "@/api/template";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";

const formSchema = z.object({
  title: z.string().max(255),
  template: z.string(),
});

export type TemplateForm = z.infer<typeof formSchema>;

export default function New() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [variables, setVariables] = useState<string[]>([]);

  const form = useForm<TemplateForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      template: "",
    },
  });

  const { mutate, isLoading } = useMutation(create, {
    onSuccess: () => {
      toast({ description: "Template created." });
      navigate("/app");
    },
    onError: (error: Error) => {
      toast({ variant: "destructive", description: error.message });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const vars = getVariables(values.template);
    setVariables(vars);
    setOpen(true);
  }

  function onSave() {
    mutate({
      title: form.getValues("title"),
      template: form.getValues("template"),
    });
  }

  return (
    <>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Front End Template"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="template"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Template</FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-96"
                    placeholder="I am applying for [[POSITION]]..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please write your variavles in double brackets. Eg:{" "}
                  {`[[POSITION]]`}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            Save
          </Button>
        </form>
      </Form>
      <ConfirmationAlertDialog
        open={open}
        setOpen={setOpen}
        variables={variables}
        onSave={onSave}
      />
    </>
  );
}
