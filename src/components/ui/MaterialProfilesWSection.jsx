import MaterialSpecsTable from './MaterialSpecsTable';
import MaterialMeasureCard, { MaterialMeasureGroupTitle } from './MaterialMeasureCard';
import MaterialAccentPanel from './MaterialAccentPanel';
import Button from './Button';
import { WhatsAppIcon } from './Icons';
import { getWhatsAppUrl, productWhatsAppMessage } from '../../utils/whatsapp';
import { PROFILES_W_DATA } from '../../config/profilesWCatalog';

function FamilyGroup({ title, families, materialName, groupId }) {
  return (
    <div>
      <MaterialMeasureGroupTitle>{title}</MaterialMeasureGroupTitle>
      <ul className="mt-4 grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {families.map((entry) => {
          const waUrl = getWhatsAppUrl(
            productWhatsAppMessage(`${materialName} ${entry.family}`),
          );

          return (
            <MaterialMeasureCard
              key={`${groupId}-${entry.family}`}
              title={entry.family}
              badge="Perfil W"
              summary={entry.measures.join(' · ')}
              waUrl={waUrl}
            />
          );
        })}
      </ul>
    </div>
  );
}

/**
 * @param {{ materialName: string }} props
 */
export default function MaterialProfilesWSection({ materialName }) {
  const { howToRead, mechanicalProperties, orderNote, tipoI, tipoH } = PROFILES_W_DATA;

  return (
    <section className="w-full space-y-10">
      <div>
        <h2 className="font-display text-xl text-ink sm:text-2xl">Medidas disponibles</h2>

        <div className="mt-6">
          <MaterialAccentPanel title="Cómo leer la medida">
            <p className="mt-2 font-display text-lg text-orange">{howToRead.example}</p>
            <ul className="mt-3 space-y-1.5 text-sm text-ink-muted">
              {howToRead.lines.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-lavender-deep" aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
          </MaterialAccentPanel>
        </div>
      </div>

      <div>
        <h3 className="font-display text-lg text-ink">Propiedades mecánicas</h3>
        <div className="mt-4">
          <MaterialSpecsTable
            columns={mechanicalProperties.columns}
            rows={mechanicalProperties.rows}
          />
        </div>
      </div>

      <FamilyGroup
        title="Perfiles Tipo I"
        families={tipoI}
        materialName={materialName}
        groupId="tipo-i"
      />

      <FamilyGroup
        title="Perfiles Tipo H / HP"
        families={tipoH}
        materialName={materialName}
        groupId="tipo-h"
      />

      <p className="text-sm text-ink-muted">{orderNote}</p>
    </section>
  );
}
