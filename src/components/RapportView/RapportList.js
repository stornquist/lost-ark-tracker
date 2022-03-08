import React, { useContext } from 'react';
import DataTable from 'react-data-table-component';
import { useRapports, useUpsertRapport } from '../../utils/queries/rapports';
import { CrystalAuraContext } from '../Main/Main';
import { useRapportColumns } from './hooks/rapportColumns';

const RapportList = ({ setRapport }) => {
  const { data: rapports = [] } = useRapports();
  const { mutate: upsertRapport } = useUpsertRapport();
  const hasCrystalAura = useContext(CrystalAuraContext);

  const handleCheckboxChange = (data, type, count) => {
    const rapport = {
      ...data,
      [type]: data[type] === count ? count - 1 : count,
    };
    upsertRapport(rapport);
  };

  const columns = useRapportColumns({
    hasCrystalAura,
    rapports,
    onCheckboxChange: handleCheckboxChange,
    setRapport,
  });
  return (
    <div
      style={{
        maxWidth: 400,
      }}
    >
      <DataTable data={rapports} columns={columns} theme="custom" />
    </div>
  );
};

export default RapportList;
