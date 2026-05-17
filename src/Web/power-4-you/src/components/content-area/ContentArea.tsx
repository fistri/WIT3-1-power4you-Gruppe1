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
    //TODO: Tabelle mit Solarmodulen pro Kunde, mit Detailbereich für den Graphen? Was noch?

    return (
        <div className="flex-row content-area margin-bottom-large border-radius">
            {selectedOverview}
        </div>
    )
}

export default ContentArea