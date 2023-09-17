export const userLogin =async (data:{email: string; password: string}) => {
    try {
        const resp = await {
            method: 'post',
            url: '',
            data
        }
        return resp.data
    } catch (error) {
        console.log(error)
    }
}