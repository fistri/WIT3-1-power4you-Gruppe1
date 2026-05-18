const getUserById = async (id: number) => {
    if (typeof id !== 'number' || Number.isNaN(id)) {
        throw new Error('Invalid id');
    }

    try {
        const response = await fetch(`http://localhost:3000/api/user/${id}`, {
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
        console.error('Error fetching user:', error);
        throw error;
    }
}

export default getUserById;
