import type { ColDef } from "ag-grid-community";

export const columnDefsAgGrid: ColDef[] = [
    { 
        field: 'Solarmodultypnummer', 
        headerName: 'ID', 
        maxWidth: 80,
        sortable: true, 
        filter: true 
    },
    { 
        field: 'Bezeichnung', 
        headerName: 'Description', 
        sortable: true, 
        filter: true 
    },
    { 
        field: 'Umpp', 
        headerName: 'Voltage', 
        maxWidth: 120,
        sortable: true, 
        filter: true 
    },
    { 
        field: 'Impp', 
        headerName: 'Ampere', 
        maxWidth: 120,
        sortable: true, 
        filter: true 
    },
    { 
        field: 'Pmpp', 
        headerName: 'Watt', 
        maxWidth: 120,
        sortable: true, 
        filter: true 
    },
]