import Bull from "bull";
import emailProcess from "../process/emailProcess";
const emailQueue = new Bull('emails', {
    redis: '127.0.0.1:6379'
})
emailQueue.process(emailProcess)
const sendNewEmail = async (data: any) => {
    await emailQueue.add(
        {
            message: data
        }
        ,
        // {
        //     attempts: 30,
        //     delay: 10
        // }
    )
}

emailQueue.on('completed', (job: any, result: any) => {
    console.log(`job completed ${result}`);

})

export {
    sendNewEmail
}