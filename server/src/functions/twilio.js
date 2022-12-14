require('dotenv').config()

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;

const client = require('twilio')(accountSid, authToken);

exports.sendOrderNotification = (userData, orderData) => {

  const { name, phone } = userData

  const { order_id, order_total, order_date } = orderData

  const message = `OlÃ¡, ${name}.

Seu pedido acaba de ser aprovado â.
    
*Detalhes do pedido:*
ð¦ *Pedido NÂº* #${order_id}
ð§¾ *Valor Total:* R$ ${order_total.toFixed(2).replace(".", ",")}
ð *Data:* ${order_date.replace(/-/g, "/")}
    
Muito obrigado por comprar na Fashionista â¤(â'â¡'â)â¨!!`

  client.messages
    .create({
      body: message,
      from: `whatsapp:+${process.env.TWILIO_FROM_NUMBER}`,
      to: `whatsapp:+556281635803`
    })
    .then(message => console.log(message.sid))
    .done();
}
