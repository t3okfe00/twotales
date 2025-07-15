import Spinner from "@/components/Spinner";
export default async function loading() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Spinner size={48} color="#6366f1" />
    </div>
  );
}
