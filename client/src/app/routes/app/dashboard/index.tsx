import { getAllTemplates } from "@/api/template";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Template from "@/models/template";
import useTemplate from "@/store/template";
import { useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { templates, setTemplates, selectTemplate } = useTemplate();

  const { mutate } = useMutation(getAllTemplates, {
    onSuccess: (templates: Template[]) => {
      setTemplates(templates);
    },
    onError: (error: Error) => {
      toast({ variant: "destructive", description: error.message });
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  const onTemplateSelect = (template: Template) => {
    selectTemplate(template);
    navigate(`/app/${template._id}`);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <span className="text-muted-foreground">My templates</span>
        <Link to={"/app/new"}>
          <Button>
            <Plus /> New template
          </Button>
        </Link>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        {templates.map((t, index) => (
          <button
            key={index}
            className="border p-2 flex rounded-md hover:underline"
            onClick={() => onTemplateSelect(t)}
          >
            {t.title}
          </button>
        ))}
      </div>
    </>
  );
}
