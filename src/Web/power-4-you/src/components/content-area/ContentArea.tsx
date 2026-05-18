import { AgGridReact } from "ag-grid-react"
import "./content-area.css"
import { columnDefsAgGrid } from "../../helper/columnDefsAgGrid"
import { moduleTypes } from "../../helper/testDataModuleType"

const ContentArea = (
    {
        selectedOverview
    }:
        {
            selectedOverview: "solar" | "profile"
        }
) => {
    //TODO: Tabelle mit Solarmodulen pro Kunde, mit Detailbereich für den Graphen

    return (
        <div className="flex-row content-area margin-bottom-large border-radius">
            {selectedOverview === "solar" && (
                <div className="ag-theme-quartz" style={{ height: "100%", width: "100%" }}>
                    <AgGridReact
                        columnDefs={columnDefsAgGrid}
                        rowData={moduleTypes}
                        autoSizeStrategy={{ type: "fitGridWidth" }}
                    />
                </div>
            )}
        </div>
    )
}

export default ContentArea