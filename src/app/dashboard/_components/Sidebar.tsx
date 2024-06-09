import Link from "next/link";
import { Boxes } from "lucide-react";

function Sidebar() {
  return (
    <div className="flex min-h-screen flex-col gap-2 bg-muted/40">
      <nav className="grid items-start px-2 py-2 text-sm font-medium lg:px-4">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <Boxes className="h-4 w-4" />
          Collections
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
