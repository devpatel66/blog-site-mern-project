class User{
    async login(data){
        try {
            const response = await fetch("http://localhost:8000/api/v1/user/login",{
            method:"Post",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body : JSON.stringify(data)
        })
        let res = await response.text()
        res = JSON.parse(res)
        return res
        } catch (error) {
            console.log(error.messsage);
        }
    }

    async RegisterUser(data){
        try {
            const response = await fetch("http://localhost:8000/api/v1/user/register",{
                method:"Post",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                body : JSON.stringify(data)
            })
            let res = await response.text()
            res = JSON.parse(res)
            return res
        } catch (error) {
            console.log(error.messsage);
        }
    }
}

const userAuth = new User();

export default userAuth