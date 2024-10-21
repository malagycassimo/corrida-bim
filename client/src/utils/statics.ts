export const provinces: { label: string; value: string }[] = [
    { label: "Maputo", value: "maputo" },
    { label: "Gaza", value: "gaza" },
    { label: "Inhambane", value: "inhambane" },
    { label: "Manica", value: "manica" },
    { label: "Sofala", value: "sofala" },
    { label: "Tete", value: "tete" },
    { label: "Zambézia", value: "zambezia" },
    { label: "Nampula", value: "nampula" },
    { label: "Cabo Delgado", value: "cabo_delgado" },
    { label: "Niassa", value: "niassa" },
];

export const provincesEnum: string[] = provinces.map(
    (province) => province.value,
);
