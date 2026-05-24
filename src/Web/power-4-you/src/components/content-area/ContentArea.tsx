import { AgGridReact } from "ag-grid-react"
import "./content-area.css"
import { columnDefsAgGrid } from "../../helper/columnDefsAgGrid"
import { useEffect, useState } from "react"
import Drawer from "rsuite/esm/Drawer/Drawer"
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { getSolarModules } from "../../api/get/solarModules"
import type { Kunde, User } from "../../../generated/prisma"
import { getPower } from "../../api/get/power"
import type { SolarModule } from "../../interface/module"
import type { RowClickedEvent } from "ag-grid-community";
import { useToaster } from "rsuite"
import Toast from "../../helper/Toast"

const ContentArea = (
    {
        customerData,
        user
    }: {
        customerData: Kunde | undefined
        user: User | undefined
    }
) => {
    const [open, setOpen] = useState(false)
    const [selectedModule, setSelectedModule] = useState<SolarModule | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const [solarModules, setSolarModules] = useState<SolarModule[] | undefined>(undefined)
    const [powerOutput, setPowerOutput] = useState<{ time: string; powerOut: number }[] | undefined>(undefined)
    const toaster = useToaster();

    const handleRowClick = (event: RowClickedEvent<SolarModule>) => {
        setSelectedModule(event.data)
        setOpen(true)
    }

    useEffect(() => {
        const fetchSolarModules = async () => {
            if (!customerData || !user) return
            setIsLoading(true)
            const { success, data, error } = await getSolarModules(customerData.Kundennummer, user)
            setIsLoading(false)
            if (!success) {
                const errorMessage = `Failed to fetch solar modules: ${error}`;
                toaster.push(<Toast message={errorMessage} />, { placement: "topCenter" });
            } else {
                setSolarModules(data);
            }
        }
        fetchSolarModules()
    }, [customerData, user])

    useEffect(() => {

        const fetchPowerOutput = async () => {
            if (!selectedModule || !user) {
                setPowerOutput(undefined)
                return
            }
            const { success, data, error } = await getPower(selectedModule.Modulnummer, user)
            if (!success) {
                const errorMessage = `Failed to fetch power output: ${error}`;
                toaster.push(<Toast message={errorMessage} />, { placement: "topCenter" });
            } else {
                const powerData = data?.map((entry) => ({
                    time: new Date(entry.Timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    powerOut: entry.Power_Out
                }))
                setPowerOutput(powerData);
            }
        }

        fetchPowerOutput()
    }, [selectedModule, user])

    return (
        <div className="flex-row content-area margin-bottom-large border-radius">
            <div className="ag-theme-quartz" style={{ height: "100%", width: "100%" }}>
                <AgGridReact
                    loading={isLoading}
                    columnDefs={columnDefsAgGrid}
                    rowData={solarModules}
                    autoSizeStrategy={{ type: "fitGridWidth" }}
                    onRowClicked={handleRowClick}
                />
            </div>
            <Drawer open={open} onClose={() => setOpen(false)} size={800}>
                <Drawer.Header>
                    <Drawer.Title>{selectedModule ? selectedModule.Bezeichnung : "Unknown Module"}</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart
                            data={powerOutput}
                            margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
                        >
                            <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
                            <Line type="monotone" dataKey="powerOut" stroke="purple" strokeWidth={2} name="Power Output" />
                            <XAxis dataKey="time" />
                            <YAxis
                                label={{ value: 'Power Out', position: 'insideLeft', angle: -90, style: { textAnchor: 'middle' } }}
                            />
                            <Legend />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                </Drawer.Body>
            </Drawer>
        </div>
    )
}

export default ContentArea