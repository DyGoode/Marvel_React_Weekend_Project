let token = `c5e123db09b9ae4fd3acf8e33ec8192051aca4da003d692b`

export const serverCalls = {
    get: async () => {
        const response = await fetch(`https://cotton-grateful-grenadilla.glitch.me/api/marvel_characters`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        }

        return await response.json()
    },

    create: async(data: any = {}) => {
        const response = await fetch(`https://cotton-grateful-grenadilla.glitch.me/api/marvel_characters`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error('Failed to Create new data on server')
        }

        return await response.json()
    },

    update: async (id:string, data:any = {}) => {
        const response = await fetch(`https://cotton-grateful-grenadilla.glitch.me/api/marvel_characters/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
    },
    
    delete: async(id:string) => {
        const response = await fetch(`https://cotton-grateful-grenadilla.glitch.me/api/marvel_characters/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        })
    }
}