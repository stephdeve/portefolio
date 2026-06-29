export const metadata = {
  title: 'Mes Compétences',
  description: 'Développeur passionné par la conception d\'applications performantes, évolutives et modernes.',
};

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-[#f4f7fc]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* ========== EN-TÊTE ========== */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0b2b4b] tracking-tight mb-2">
            MES COMPÉTENCES
          </h1>
          <p className="text-xl text-[#2d4056] font-normal max-w-[600px] mx-auto mb-1">
            Un ensemble de compétences pour créer des solutions complètes
          </p>
          <p className="text-base text-[#4a5b6e] max-w-[550px] mx-auto">
            Développeur passionné par la conception d&apos;applications performantes, évolutives et modernes.
          </p>
        </div>

        {/* ========== GRILLE DES CARTES ========== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

          {/* 01 – Développement Web */}
          <div className="bg-white rounded-[20px] p-7 sm:p-8 shadow-[0_8px_24px_rgba(0,20,40,0.06)] hover:shadow-[0_16px_32px_rgba(0,20,40,0.08)] hover:-translate-y-1 transition-all duration-200">
            <div className="text-4xl font-bold text-[#cbd5e1] tracking-tight mb-1">01</div>
            <h3 className="text-xl font-bold text-[#0b2b4b] mb-1">Développement Web</h3>
            <p className="text-sm text-[#4a5b6e] mb-5">Conception et développement d&apos;applications web modernes et performantes.</p>

            <div className="mb-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#6b7f94] mb-2">FRONTEND</div>
              <SkillBar label="HTML5" percent={90} />
              <SkillBar label="CSS3 / Tailwind CSS" percent={85} />
              <SkillBar label="JavaScript (ES6+)" percent={85} />
              <SkillBar label="Vue.js / React / Next.js" percent={80} />
              <SkillBar label="Alpine.js" percent={70} />
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#6b7f94] mb-2">BACKEND</div>
              <SkillBar label="Java / Spring Boot" percent={90} />
              <SkillBar label="PHP / Laravel / Livewire" percent={85} />
              <SkillBar label="API REST" percent={90} />
              <SkillBar label="Spring Security / JWT" percent={80} />
            </div>
          </div>

          {/* 02 – Développement Mobile */}
          <div className="bg-white rounded-[20px] p-7 sm:p-8 shadow-[0_8px_24px_rgba(0,20,40,0.06)] hover:shadow-[0_16px_32px_rgba(0,20,40,0.08)] hover:-translate-y-1 transition-all duration-200">
            <div className="text-4xl font-bold text-[#cbd5e1] tracking-tight mb-1">02</div>
            <h3 className="text-xl font-bold text-[#0b2b4b] mb-1">Développement Mobile</h3>
            <p className="text-sm text-[#4a5b6e] mb-5">Création d&apos;applications mobiles fluides et intuitives.</p>

            <SkillBar label="Flutter" percent={85} />
            <SkillBar label="Dart" percent={80} />
            <SkillBar label="Consommation API REST" percent={85} />
            <SkillBar label="SQLite" percent={70} />
            <SkillBar label="UI/UX Mobile" percent={75} />
            <SkillBar label="Intégration Backend" percent={80} />
          </div>

          {/* 03 – Cloud Computing & DevOps */}
          <div className="bg-white rounded-[20px] p-7 sm:p-8 shadow-[0_8px_24px_rgba(0,20,40,0.06)] hover:shadow-[0_16px_32px_rgba(0,20,40,0.08)] hover:-translate-y-1 transition-all duration-200">
            <div className="text-4xl font-bold text-[#cbd5e1] tracking-tight mb-1">03</div>
            <h3 className="text-xl font-bold text-[#0b2b4b] mb-1">Cloud Computing &amp; DevOps</h3>
            <p className="text-sm text-[#4a5b6e] mb-5">Déploiement, automatisation et gestion d&apos;infrastructures cloud.</p>

            <SkillBar label="Docker" percent={90} />
            <SkillBar label="Kubernetes" percent={85} />
            <SkillBar label="AWS (Services)" percent={85} />
            <SkillBar label="CI/CD (GitHub Actions)" percent={85} />
            <SkillBar label="Amazon ECR" percent={80} />
            <SkillBar label="Linux (Ubuntu)" percent={85} />
            <SkillBar label="Surveillance &amp; Logs" percent={70} />
          </div>

          {/* 04 – Outils & Technologies */}
          <div className="bg-white rounded-[20px] p-7 sm:p-8 shadow-[0_8px_24px_rgba(0,20,40,0.06)] hover:shadow-[0_16px_32px_rgba(0,20,40,0.08)] hover:-translate-y-1 transition-all duration-200">
            <div className="text-4xl font-bold text-[#cbd5e1] tracking-tight mb-1">04</div>
            <h3 className="text-xl font-bold text-[#0b2b4b] mb-1">Outils &amp; Technologies</h3>
            <p className="text-sm text-[#4a5b6e] mb-5">Outils et technologies que j&apos;utilise au quotidien pour développer et déployer.</p>

            <div className="flex flex-wrap gap-2">
              {['Git', 'GitHub', 'IntelliJ IDEA', 'VS Code', 'MySQL', 'PostgreSQL', 'RabbitMQ', 'PlantUML', 'Windows Server', 'Linux', 'Nginx'].map((tool) => (
                <span key={tool} className="bg-[#f0f4fa] px-3.5 py-1 rounded-full text-sm font-medium text-[#1e2a3a]">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* 05 – Compétences Humaines */}
          <div className="bg-white rounded-[20px] p-7 sm:p-8 shadow-[0_8px_24px_rgba(0,20,40,0.06)] hover:shadow-[0_16px_32px_rgba(0,20,40,0.08)] hover:-translate-y-1 transition-all duration-200 md:col-span-2">
            <div className="text-4xl font-bold text-[#cbd5e1] tracking-tight mb-1">05</div>
            <h3 className="text-xl font-bold text-[#0b2b4b] mb-1">Compétences Humaines</h3>
            <p className="text-sm text-[#4a5b6e] mb-5">Des soft skills essentielles pour mener à bien les projets et collaborer efficacement.</p>

            <div className="flex flex-wrap gap-2">
              {['Résolution de problèmes', "Esprit d'analyse", 'Autonomie', 'Apprentissage continu', 'Rigueur', "Esprit d'innovation", 'Travail en équipe', 'Communication technique', 'Gestion des priorités'].map((skill) => (
                <span key={skill} className="bg-[#f0f4fa] px-3.5 py-1 rounded-full text-sm font-medium text-[#1e2a3a]">
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* ========== BANDEAU ========== */}
        <div className="text-center bg-white rounded-[20px] p-8 shadow-[0_8px_24px_rgba(0,20,40,0.04)] mb-12">
          <p className="text-lg font-medium text-[#0b2b4b]">
            <span className="text-[#0077b6]">Toujours en quête d&apos;apprendre et de créer !</span>
            <br />
            Je m&apos;efforce chaque jour d&apos;améliorer mes compétences et d&apos;explorer de nouvelles technologies pour construire des solutions innovantes.
          </p>
        </div>

        {/* ========== STATISTIQUES ========== */}
        <div className="flex flex-wrap justify-around gap-6 bg-white rounded-[20px] p-8 shadow-[0_8px_24px_rgba(0,20,40,0.04)]">
          <StatItem number="50+" label="Projets réalisés" />
          <StatItem number="3+" label="Années d'expérience" />
          <StatItem number="20+" label="Technologies maîtrisées" />
          <StatItem number="100%" label="Passionné" />
        </div>

      </div>
    </div>
  );
}

function SkillBar({ label, percent }: { label: string; percent: number }) {
  return (
    <div className="mb-2">
      <div className="flex items-center justify-between text-sm py-0.5">
        <span className="font-medium text-[#1e2a3a]">{label}</span>
        <span className="font-semibold text-[#0b2b4b] bg-[#eef2f7] px-2.5 py-0.5 rounded-full text-xs">
          {percent}%
        </span>
      </div>
      <div className="w-full h-[5px] bg-[#e9edf2] rounded-full">
        <div
          className="h-full bg-[#0077b6] rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center min-w-[120px]">
      <div className="text-4xl sm:text-5xl font-bold text-[#0b2b4b] leading-tight">{number}</div>
      <div className="text-sm sm:text-base text-[#4a5b6e] font-medium">{label}</div>
    </div>
  );
}
