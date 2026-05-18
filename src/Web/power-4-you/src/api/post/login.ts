
const login = async (username: string, password: string, api_key: string) => {
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                api_key: api_key
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }

}

export default login