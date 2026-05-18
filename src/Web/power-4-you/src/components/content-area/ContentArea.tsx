import { AgGridReact } from "ag-grid-react"
import "./content-area.css"
import { columnDefsAgGrid } from "../../helper/columnDefsAgGrid"
import { moduleTypes, powerOutput } from "../../helper/testData"
import { useMemo, useState } from "react"
import Drawer from "rsuite/esm/Drawer/Drawer"
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

const ContentArea = (
    {
        selectedOverview
    }:
        {
            selectedOverview: "solar" | "profile"
        }
) => {
    const [open, setOpen] = useState(false)
    const [selectedModule, setSelectedModule] = useState<any | null>(null)


    const handleRowClick = (event: any) => {
        setSelectedModule(event.data)
        setOpen(true)
    }

    const data = useMemo(() => {
        if (!selectedModule) return []
        const powerData = powerOutput
        .filter((entry) => entry.Modulnummer === selectedModule.Solarmodultypnummer)
        .map((entry) => ({
            time: entry.Timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            powerOut: entry.Power_out
        }))
        return powerData
    }, [selectedModule])

    return (
        <div className="flex-row content-area margin-bottom-large border-radius">
            {selectedOverview === "solar" && (
                <div className="ag-theme-quartz" style={{ height: "100%", width: "100%" }}>
                    <AgGridReact
                        columnDefs={columnDefsAgGrid}
                        rowData={moduleTypes} // TODO: This should be the data from the backend
                        autoSizeStrategy={{ type: "fitGridWidth" }}
                        onRowClicked={handleRowClick}
                    />
                </div>
            )}
            {selectedOverview === "profile" && (
                "Profile Overview"
            )}
            <Drawer open={open} onClose={() => setOpen(false)}>
                <Drawer.Header>
                    <Drawer.Title>{selectedModule ? selectedModule.Bezeichnung : "Unknown Module"}</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                    <LineChart
                        style={{ width: '100%', aspectRatio: 1.618, maxWidth: 600 }}
                        responsive
                        data={data} // TODO: This should be the data from the backend
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 5,
                            left: 0,
                        }}
                    >
                        <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="powerOut" stroke="purple" strokeWidth={2} name="Power Output" />
                        <XAxis dataKey="time" />
                        <YAxis width="auto" label={{ value: 'Power Out', position: 'insideLeft', angle: -90 }} />
                        <Legend />
                        <Tooltip />
                    </LineChart>
                </Drawer.Body>
            </Drawer>
        </div>
    )
}

export default ContentArea