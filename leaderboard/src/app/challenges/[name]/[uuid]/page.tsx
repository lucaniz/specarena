import Header from "@/app/_components/Header";
import PlayerURLSection from "./PlayerURLSection";
import challenges from "../../challenges.json";

export default async function UUIDPage({ 
  params 
}: { 
  params: Promise<{ name: string; uuid: string }> 
}) {
  const { name, uuid } = await params;

  const challenge = challenges[name as keyof typeof challenges];
  if (!challenge) {
    return <div>Challenge {name} not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
      <Header />

      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex flex-col gap-6 mb-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold text-zinc-900" style={{ fontFamily: 'var(--font-jost), sans-serif' }}>
              {challenge.name}
            </h1>
            <p className="text-base text-zinc-900">
              {challenge.description}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto border border-zinc-900 p-8">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 mb-2">Session ID</h2>
              <p className="text-sm text-zinc-600 font-mono">{uuid}</p>
            </div>
            <PlayerURLSection playerCount={challenge.players} />
          </div>
        </div>
        
      </section>
    </div>
  );
}

