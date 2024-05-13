'use server'

export async function getUserCurrent(idUserCurrent: any) {
    try {
        const response = await fetch(`${process.env.API_ROOT}/v1/users/${idUserCurrent}`, {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": "true",
            },
        });

        if (response.status === 200) {
            const resObject = await response.json();
            return resObject;
        } else {
            throw new Error("Authentication has failed!");
        }
    } catch (err) {
        console.log(err);
    }
}
