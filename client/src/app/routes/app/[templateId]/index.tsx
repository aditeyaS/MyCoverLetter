import { useEffect, useState } from "react";
import { z } from "zod";
import { Copy, Download, Edit, Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import jsPDF from "jspdf";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getVariables } from "@/lib/get-variables";
import useTemplate from "@/store/template";
import { deleteTemplate } from "@/api/template";
import { useToast } from "@/hooks/use-toast";
import DeleteConfirmAlertDialog from "./delete-confirm-alert-dialog";

const formSchema = z.object({
  variables: z.array(
    z.object({ name: z.string().optional(), value: z.string() })
  ),
});

export default function View() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { template } = useTemplate();
  const [open, setOpen] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      variables: [],
    },
  });

  const { fields, append } = useFieldArray({
    name: "variables",
    control: form.control,
  });

  useEffect(() => {
    if (template) {
      const vars = getVariables(template.template);
      vars.map((v) => {
        append({ name: v, value: "" });
      });
      setPreview(template.template);
    }
  }, [template, append]);

  useEffect(() => {
    const subscription = form.watch((data) => {
      if (data.variables && template) {
        let cvString = template.template;
        data.variables.forEach((data) => {
          if (data && data.name && data.value && cvString) {
            cvString = cvString.replace(`[[${data.name}]]`, data.value);
          }
          if (cvString) setPreview(cvString);
        });
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [template, form.watch]);

  const handleCopy = () => {
    navigator.clipboard.writeText(preview);
  };
  const handleDownload = () => {
    const doc = new jsPDF({ orientation: "portrait", format: "letter" });
    doc.text(preview, 20, 20);
    doc.save(`${template?.title}.pdf`);
  };

  const { mutate: mutateDelete } = useMutation(deleteTemplate, {
    onSuccess: () => {
      toast({ description: "Template deleted." });
      navigate("/app");
    },
    onError: (error: Error) => {
      toast({ variant: "destructive", description: error.message });
    },
  });

  const handleConfirmDelete = () => {
    if (template) {
      mutateDelete(template._id);
    }
  };

  return (
    <>
      {template && (
        <>
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold">{template?.title}</h1>
            <div className="space-x-2">
              <Link to={`/app/${template._id}/edit`}>
                <Button size={"icon"} variant={"outline"}>
                  <Edit />
                </Button>
              </Link>
              <Button
                size={"icon"}
                variant={"destructive"}
                onClick={() => setOpen(true)}
              >
                <Trash />
              </Button>
              <Button
                size={"icon"}
                onClick={handleCopy}
                disabled={!form.formState.isDirty || !form.formState.isValid}
              >
                <Copy />
              </Button>
              <Button
                size={"icon"}
                title="Download pdf"
                onClick={handleDownload}
              >
                <Download />
              </Button>
            </div>
          </div>
          <Form {...form}>
            <form className="grid grid-cols-4 gap-1">
              {fields.map((field, index) => (
                <FormField
                  key={`variables.${index}`}
                  control={form.control}
                  name={`variables.${index}`}
                  render={() => (
                    <FormItem>
                      <FormLabel className="capitalize">
                        {field.name?.toLowerCase()}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...form.register(`variables.${index}.value`)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </form>
          </Form>
          <pre className="my-4 border px-3 py-2 rounded text-xs">{preview}</pre>
          <DeleteConfirmAlertDialog
            open={open}
            setOpen={setOpen}
            title={template.title}
            onDelete={handleConfirmDelete}
          />
        </>
      )}
    </>
  );
}
