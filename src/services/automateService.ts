import { transporter } from "config/ses";
import { VERIFIED_EMAIL } from "config";
import { template } from 'utils';
import { CustomError } from 'utils';


const sendMail = async ({ mails, mail_body, mail_content }: { mails: Array<string>, mail_content: string, mail_body: string }) => {
	const htmlToSend = template({
		mail_content
	});
	try {
		for (let i = 0; i < mails.length; i += 40 ) {
			const slicedMails = mails.slice(i, i+40)
			await transporter.sendMail({
				from: VERIFIED_EMAIL,
				to: VERIFIED_EMAIL,
				bcc: slicedMails,
				subject: mail_body,
				html: htmlToSend 
			})
		}
	} catch (err) {
		throw new CustomError('EMAIL NOT SENT', 404);
	}

}

export {
	sendMail
} 
