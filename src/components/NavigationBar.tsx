import { SignedIn, SignedOut } from "@clerk/nextjs";
import { currentUser, User } from "@clerk/nextjs/server";

export default async function NavigationBar() {
  const user = await currentUser();
  return (
    <div className="flex justify-between p-[2rem]">
      <div></div>
      <div className="flex items-center justify-center gap-3">
        <NavigationItem>Test</NavigationItem>
        <UserLoginButton user={user} />
      </div>
    </div>
  );
}

type NavigationItemProps = {
  children: React.ReactNode;
  href?: string;
};

function NavigationItem({ children, href}: NavigationItemProps) {
  return (
    <a href={href} className="text-sm smooth_transition cursor-pointer rounded-md bg-neutral-400 bg-opacity-[0.34] px-3 py-2 hover:bg-opacity-[0.37]">
      {children}
    </a>
  );
}

type UserLoginButtonProps = {
  user: User | null;
};

function UserLoginButton({ user }: UserLoginButtonProps) {
  return (
    <div>
      <SignedIn>
        <h1>hello</h1>
      </SignedIn>
      <SignedOut>
        <NavigationItem href="/sign-in">Get Started</NavigationItem>
      </SignedOut>
    </div>
  );
}
