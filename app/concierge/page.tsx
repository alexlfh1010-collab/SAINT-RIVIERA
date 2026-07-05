const message = encodeURIComponent("Olá, quero ajuda para escolher meu tamanho e montar meu look SAINT RIVIERA.");
export const metadata = { title: "Concierge" };
export default function ConciergePage() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  return <main className="concierge-page"><p className="eyebrow">Concierge privado</p><h1>Algumas escolhas<br /><em>merecem conversa.</em></h1><p>Nosso Concierge pode orientar tamanho, caimento, combinações e acesso aos próximos drops. Atendimento humano, sem pressa.</p>{phone ? <a className="button button--dark" href={`https://wa.me/${phone}?text=${message}`} target="_blank" rel="noreferrer">Iniciar conversa no WhatsApp <span>↗</span></a> : <span className="button button--dark" aria-disabled="true">WhatsApp aguardando configuração</span>}<div><span>Horário</span><p>Segunda a sábado<br />10h — 19h</p></div></main>;
}
