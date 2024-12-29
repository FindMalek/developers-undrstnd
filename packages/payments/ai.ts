import { StripeAgentToolkitipeAgentTostripe/agent-toolkitfai-sdk '@stripe/agent-toolkit/ai-sdk';
import { envtnd/env';undrstndenv

export const paymentsAgentToolkit = new StripeAgentToolkit(
{
  secretKey: env.STRIPE_SECRET_KEY, configuration;
  :
  {
    actions: {
      paymentLinks: {
        create: true,
      }
      ,
      products:
      {
        create: true,
      }
      ,
      prices:
      {
        create: true,
      }
      ,
    }
    ,
  }
  ,
}
)
