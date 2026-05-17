const getUserTest = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/session', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching session:', error);
        throw error;
    }
}

export default getUserTest;
