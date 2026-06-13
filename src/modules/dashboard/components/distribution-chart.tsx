interface DistributionChartProps {
  title: string;
  data: { name: string; count: number; color?: string }[];
  total: number;
}

const originLabels: Record<string, string> = {
  WHATSAPP: "WhatsApp",
  SITE: "Site",
  INDICACAO: "Indicação",
  INSTAGRAM: "Instagram",
  FACEBOOK: "Facebook",
  LINKEDIN: "LinkedIn",
  GOOGLE: "Google",
  PORTAL_IMOVEIS: "Portal de Imóveis",
  EMAIL: "E-mail",
  TELEFONE: "Telefone",
  VISITA_PRESENCIAL: "Visita Presencial",
  EVENTO: "Evento",
  OUTDOOR: "Outdoor",
  TV: "TV",
  RADIO: "Rádio",
  APARTAMENTO: "Apartamento",
  CASA: "Casa",
  COBERTURA: "Cobertura",
  STUDIO: "Studio",
  KITNET: "Kitnet",
  TERRENO: "Terreno",
  SALA_COMERCIAL: "Sala Comercial",
  LOJA: "Loja",
  GALPAO: "Galpão",
  CHACARA: "Chácara",
  FAZENDA: "Fazenda",
  FLAT: "Flat",
  LOFT: "Loft",
  SOBRADO: "Sobrado",
  CASA_CONDOMINIO: "Casa em Condomínio",
  PENTHOUSE: "Penthouse",
  COMPRA: "Compra",
  ALUGUEL: "Aluguel",
};

const COLORS = [
  "#1e3a7b",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
];

export const DistributionChart = ({
  title,
  data,
  total,
}: DistributionChartProps) => {
  return (
    <div className="bg-sidebar border border-border rounded-xl p-5 flex flex-col gap-4">
      <h2 className="font-bold text-text-base">{title}</h2>
      <div className="flex flex-col gap-3">
        {data.length === 0 && (
          <p className="text-sm text-text-muted">Nenhum dado disponível.</p>
        )}
        {data.map((item, i) => (
          <div key={item.name} className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">
                {originLabels[item.name] ?? item.name}
              </span>
              <span className="font-semibold text-text-base">{item.count}</span>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.min((item.count / (total || 1)) * 100, 100)}%`,
                  backgroundColor: item.color ?? COLORS[i % COLORS.length],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
