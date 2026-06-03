import SkeletonTile from "@/components/ui/SkeletonTile";

export default function Loading() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#080c10]">
      <div className="hidden w-[220px] shrink-0 border-r border-white/6 bg-[#0a0e14] md:block" />

      <main className="flex flex-1 flex-col overflow-y-auto pb-16 md:pb-0">
        <SkeletonTile />
      </main>
    </div>
  );
}
