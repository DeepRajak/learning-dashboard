import { Suspense } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import BentoGrid from "@/components/dashboard/BentoGrid";
import HeroTile from "@/components/dashboard/HeroTile";
import ActivityTile from "@/components/dashboard/ActivityTile";
import AchievementsTile from "@/components/dashboard/AchievementsTile";
import SectionHeader from "@/components/dashboard/SectionHeader";
import CoursesSection from "@/components/dashboard/CoursesSection";
import CoursesSkeletonGroup from "@/components/ui/CoursesSkeletonGroup";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#080c10]">
      <Sidebar />

      <main
        className="flex flex-1 flex-col overflow-y-auto pb-16 md:pb-0"
        aria-label="Dashboard content"
      >
        <section aria-label="Dashboard overview" className="p-4 md:p-6 lg:p-8">
          <BentoGrid>
            <HeroTile />
            <ActivityTile />
            <AchievementsTile />
            <SectionHeader label="Currently Learning" />
            <Suspense fallback={<CoursesSkeletonGroup />}>
              <CoursesSection />
            </Suspense>
          </BentoGrid>
        </section>
      </main>
    </div>
  );
}
