/* eslint-disable @typescript-eslint/no-explicit-any */
import "./nav-bar.css"
import { memo } from "react"
import { Tab, Tabs } from "rsuite"

const NavBar = (
    { 
        selectedOverview, 
        setSelectedOverview 
    }: 
    { 
        selectedOverview: string, 
        setSelectedOverview: any 
    }
) => {
    return (
        <div className="flex-row margin-bottom-large border-radius nav-bar">
            <Tabs activeKey={selectedOverview} onSelect={setSelectedOverview} appearance="subtle">
                    <Tab title="Dashboard" eventKey="dashboard" />
                    <Tab title="Storage" eventKey="storage" />
                    <Tab title="Solar" eventKey="solar" />
                </Tabs>
        </div>
    )
}

export default memo(NavBar)