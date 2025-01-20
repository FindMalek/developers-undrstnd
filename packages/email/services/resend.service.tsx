import { keys } from "../keys"
import { WaitlistTemplate } from "../templates/waitlist"
import { WaitlistJoinedTemplate } from "../templates/waitlist-joined"
import { Resend } from "resend"
import { log } from '@undrstnd/observability/log';

interface SendEmailOptions {
  to: string[]
  subject: string
  react: React.ReactElement
}

export class ResendService {
  private resend = new Resend(keys().RESEND_TOKEN)

  private async sendEmail({ to, subject, react }: SendEmailOptions) {
    try {
      const data = await this.resend.emails.send({
        from: "Undrstnd Developers <no-reply@developers.undrstnd.dev>",
        to,
        subject,
        react,
      })

      return { success: true, data }
    } catch (error) {
      return { success: false, error }
    }
  }

  async sendWaitlistJoinedEmail(to: string[]) {
    log.info("Sending waitlist joined email to", to)
    return this.sendEmail({
      to,
      subject: "Welcome to Undrstnd Developers Waitlist!",
      react: <WaitlistJoinedTemplate />,
    })
  }

  async sendWaitlistAcceptedEmail(to: string[]) {
    log.info("Sending waitlist accepted email to", to)
    return this.sendEmail({
      to,
      subject: "You're In! Welcome to Undrstnd Developers",
      react: <WaitlistTemplate />,
    })
  }
}
