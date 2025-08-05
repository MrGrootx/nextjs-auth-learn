"use client";
import { Button } from "@/components/ui/button";
import { logout } from "../login/actions";

const page = () => {
  return (
    <div>
      Dashboard page{" "}
      <Button onClick={() => logout()} variant={"destructive"}>
        Logout
      </Button>
    </div>
  );
};

export default page;
