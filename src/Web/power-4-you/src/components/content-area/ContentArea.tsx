import "./content-area.css"

const ContentArea = (
    { 
        selectedOverview, 
        setSelectedOverview 
    }: 
    { 
        selectedOverview: string, 
        setSelectedOverview: unknown 
    }
) => {
    return (
        <div className="flex-row content-area margin-bottom-large border-radius">
            {selectedOverview}
        </div>
    )
}

export default ContentArea