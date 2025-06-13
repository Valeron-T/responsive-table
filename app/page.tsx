import DataTableDemo from "./table";
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { CustomNavigationMenu } from "@/components/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TickerCard } from "../components/TickerCard";

export default function Home() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <div className="flex-row p-4 gap-4 items-center hidden md:flex">
          <div className="flex flex-row flex-1 grow gap-4">
            <TickerCard ticker="TCS" currentPrice={3825} prevClose={3790} />
            <TickerCard ticker="INFY" currentPrice={3200} prevClose={3790} />
            <TickerCard ticker="REDINGTON" currentPrice={3562} prevClose={4000} />
            <TickerCard ticker="IEX" currentPrice={4202} prevClose={3790} />
          </div>

          <CustomNavigationMenu />
          <Avatar>
            <AvatarImage src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen md:p-8 md:pt-0 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-[16px] row-start-2 !items-center sm:items-start w-full">
            <DataTableDemo />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
