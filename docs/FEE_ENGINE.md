# Fee engine

The claimant fee is not a universal percentage. It is computed from the VERIFIED jurisdiction rule for the exact state + county + surplus type.

Inputs: surplus amount, requested business fee, statutory percentage ceiling (if any), statutory dollar ceiling (if any), fee model, waiting period and rule status.

Behavior: if the rule is not VERIFIED, quote is blocked. If verified, requested percentage is clamped to the configured percentage ceiling and the resulting dollar fee is clamped to the configured dollar ceiling. A rule can prohibit a non-attorney fee entirely. Special fee models requiring attorney/licensing review remain restricted until configured.

The user-facing agreement should display the gross potential surplus, permitted service fee, estimated net to claimant, source agency, and direct/self-claim disclosure where applicable.
