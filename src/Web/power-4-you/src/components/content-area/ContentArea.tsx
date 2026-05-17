/* eslint-disable @typescript-eslint/no-explicit-any */
import "./content-area.css"

const ContentArea = (
    { 
        selectedOverview, 
        setSelectedOverview 
    }: 
    { 
        selectedOverview: string, 
        setSelectedOverview: any 
    }
) => {
    setSelectedOverview(selectedOverview)

    return (
        <div className="flex-row content-area border-radius">
            {selectedOverview}
        </div>
    )
}

export default ContentArea