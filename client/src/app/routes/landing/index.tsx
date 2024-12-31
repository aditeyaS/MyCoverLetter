import { validateUser } from "@/api/auth";
import { getIssues, github_owner, github_repo } from "@/api/github";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Issues from "@/models/issues";
import User from "@/models/user";
import useUser from "@/store/user";
import { useMutation } from "@tanstack/react-query";
import { CircleDot } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Logo } from "./logo";

export default function Landing() {
  const { isLoggedIn, loginUser, logoutUser } = useUser();
  const [issues, setIssues] = useState<Issues[]>([]);

  const { mutate: mutateGetIssues } = useMutation(getIssues, {
    onSuccess: (data: Issues[]) => {
      setIssues(data);
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });

  const { mutate: mutateValidateUser } = useMutation(validateUser, {
    onSuccess: (user: User) => {
      loginUser(user);
    },
    onError: () => {
      logoutUser();
    },
  });

  useEffect(() => {
    mutateGetIssues();
    mutateValidateUser();
  }, [mutateGetIssues, mutateValidateUser]);

  return (
    <>
      <div className="flex justify-between py-1 px-2">
        <ModeToggle />
        <button>MyCodeLetter</button>
        <Link to={isLoggedIn ? "/app" : "/auth/login"}>
          <Button>Get started</Button>
        </Link>
      </div>
      <div className="flex flex-col items-center gap-16 p-24">
        <Logo />
        <span className="text-bold text-6xl text-center text-primary">
          Making a step of your job application process easy!
        </span>
        <div className="border border-border rounded p-2 w-full">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 text-sm font-bold">
              <CircleDot className="h-5" />
              Issue
            </div>
            <a
              target="_blank"
              href={`https://github.com/${github_owner}/${github_repo}/issues/new`}
            >
              <Button size={"sm"} variant={"link"}>
                New Issue
              </Button>
            </a>
          </div>
          <div>
            {issues.map((issue, index) => (
              <div key={`github-issue-${index}`} className="flex flex-col p-1">
                <span>{issue.title}</span>
                <span className="text-xs text-muted-foreground">
                  {issue.updated_at.toString().slice(0, 10)}
                </span>
              </div>
            ))}
          </div>
          <div className="text-center mt-1">
            <a
              className="underline underline-offset-4"
              target="_blank"
              href={`https://github.com/${github_owner}/${github_repo}/issues`}
            >
              Explore issues
            </a>{" "}
            to contribute.
          </div>
        </div>
      </div>
      <footer className="p-12">cc MyCoverLeter</footer>
    </>
  );
}
