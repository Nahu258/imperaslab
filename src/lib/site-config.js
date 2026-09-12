/**
 * Configuracao central do site.
 * Altere aqui os dados da empresa: eles se propagam para o site inteiro,
 * incluindo as paginas de Politica de Privacidade e Termos de Uso.
 */
export const SITE = {
  url: 'https://imperaslab.com.br',
  name: "Impera's Lab",
  // legalName: "IMPERA'S LAB — ASSESSORIA DE ESTRUTURACAO DIGITAL LTDA.",
  legalName: "IMPERA'S LAB",
  cnpj: '00.000.000/0001-00',
  title: "Impera's Lab • Assessoria de Estruturação Digital & Inteligência de Negócios",
  description:
    'Transformamos operações sufocadas em ecossistemas digitais previsíveis: tráfego pago, automação de atendimento e inteligência de dados para negócios de alto ticket.',
  locale: 'pt_BR',
  lang: 'pt-BR',

  email: 'lxcasimpera@gmail.com',
  privacyEmail: 'privacidade@imperaslab.com.br',
  whatsappNumber: '5583991625590',
  whatsappDisplay: '(83) 99162-5590',
  address: 'João Pessoa, PB • Brasil',

  /** Mensagem pre-preenchida ao abrir o WhatsApp. */
  whatsappMessage:
    "Olá! Gostaria de solicitar um Diagnóstico Estratégico na Impera's Lab.",

  /**
   * Endpoint usado pelo formulario no navegador.
   * Mesma origem -> sem CORS. O Nginx (producao) e o Vite (dev) fazem o proxy
   * ate o webhook do n8n.
   */
  leadEndpoint: '/api/contato',
  /** Destino real do lead (n8n). */
  leadWebhook: 'https://n8n.imperaslab.com.br/webhook/contacto-lead',
  leadWebhookOrigin: 'https://n8n.imperaslab.com.br',
  leadWebhookPath: '/webhook/contacto-lead',

  /** Data da ultima revisao dos documentos legais. */
  legalUpdatedAt: '12 de setembro de 2026',
};

export const WHATSAPP_LINK = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
  SITE.whatsappMessage,
)}`;

export const NAV_LINKS = [
  { href: '/#diagnostico', label: 'Diagnóstico' },
  { href: '/#o-metodo-lab', label: 'O Método Lab' },
  { href: '/#planos', label: 'Planos & Soluções' },
  { href: '/#casos-reais', label: 'Cases Reais' },
  { href: '/#governanca', label: 'Governança' },
];
