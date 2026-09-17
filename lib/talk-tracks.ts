export const TALK_TRACKS = {
  opening: `Hello, my name is {{agent}} with SurplusClaim USA, a private recovery service. We are not a government agency. Public records indicate there may be surplus funds connected with a property associated with you. You may be able to claim those funds directly from the holding agency without hiring us. May I explain what our records show?`,
  fee: `If you choose to hire us, our fee is contingent on recovery and will never exceed the amount permitted by the verified rule for this jurisdiction. Before you sign anything, we will show you the government source, the fee, and your option to pursue the claim yourself.`,
  needProof: `That makes sense. I do not want you to rely on my word. I can give you the name of the government office and the public record reference so you can independently verify the potential surplus.`,
  soundsScam: `I understand the concern. Please do not provide sensitive information on this call. Verify the public record and our identity first. We are a private service, not the county or court, and using us is optional.`,
  canDoMyself: `Yes. If the agency permits a direct owner claim, you can pursue it yourself. Our service is for people who want help researching entitlement, documents, deadlines and the claim workflow.`,
  feeTooHigh: `I understand. The software will only quote a fee after the jurisdiction rule has been verified, and it will not quote above the legal limit. I can also show you the direct-claim option before you decide.`,
  notInterested: `Understood. Would you like no further contact, or would you prefer that I send only the public-record reference so you can review it yourself?`,
  callback: `Certainly. What day and time works for you? I will note that preference and we will not contact you before then.`,
  doNotContact: `Understood. I will mark this case do-not-contact. Thank you for your time.`
} as const;

export function pivotFor(objection: string) {
  const key = objection.toLowerCase();
  if (key.includes('scam')) return TALK_TRACKS.soundsScam;
  if (key.includes('myself') || key.includes('free')) return TALK_TRACKS.canDoMyself;
  if (key.includes('fee') || key.includes('expensive')) return TALK_TRACKS.feeTooHigh;
  if (key.includes('proof') || key.includes('verify')) return TALK_TRACKS.needProof;
  if (key.includes('later') || key.includes('callback')) return TALK_TRACKS.callback;
  if (key.includes('stop') || key.includes('do not call')) return TALK_TRACKS.doNotContact;
  return TALK_TRACKS.notInterested;
}
