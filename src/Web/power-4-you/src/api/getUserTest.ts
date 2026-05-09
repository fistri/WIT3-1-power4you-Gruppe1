
const getUserTest = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/user');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }

}

export default getUserTest