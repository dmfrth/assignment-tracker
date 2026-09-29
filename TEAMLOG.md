## 2026-09-29 Day 2 Workshop:
*  **Present:** Danielle, Ryan
*  **Scribe:** Danielle
*  **Standup:** What did each person say about their current state, today's goal, and biggest blocker or uncertainty?
    - Danielle: We have an idea for our website, but we need to figure out how to create our shared GitHub repository before we go any further. From then on we can create an idea for the website layout and go from there.
    - Ryan: 

*  **Plan**:
  *  *Goals for today:* What specific, checkable outcomes did we intend to complete?
    - Create our shared GitHub repository so we can both edit things.
    - Create a baseline layout for the website, even if it's drawn out on paper first.
    - Figure out how we can let the user add their own assignments to the website. 

* **Build**:
  * *Shipped:* What did we actually finish?

* **Review**:
  * *Reviewed:* What change did the reviewer inspect, test, question, or ask to be revised?
  * *Integration check:* Was the reviewed work successfully merged or otherwise integrated into the shared project?
  * *Clean-clone check:* Could a fresh copy of the repository be run by following the README alone? PASS / FAIL — if it failed, what was wrong and was it fixed?

* **Handoff package:** What would another developer need to know to run, understand, test, or continue the work we did today?
  * *Commitments before next Day 2:* What does each person need to complete, investigate, or bring back before the next team session?


  Sample Log:
* **Build**:
  * *Shipped:*
    - Fixed the mismatch between the Resources navigation link and the Resources section id.
    - Added one additional web-development resource link.
    - Merged the reviewed fix into <code>main</code>.
    - Corrected the README after the clean-clone test exposed an incorrect filename.
* **Review:**
  - Jordan reviewed the committed <code>fix/resources-anchor</code> branch.
  - Confirmed that the navigation link and section id match.
  - Clicked the Resources link and verified that it jumps to the correct section.
  - Tested the newly added resource link.
  - Asked: “What behavior did you test to confirm that the navigation problem was actually fixed?”
  * *Integration check:*
    PASS — the reviewed <code>fix/resources-anchor</code> branch was merged into <code>main</code>, and the Resources navigation still worked after the merge.
  * *Clean-clone check:*
    FAIL → fixed.
    A fresh clone could not be run by following the README literally because the README said to open <code>home.html</code>, but the actual page is index.html. We corrected the README, committed the documentation fix, and verified the corrected instructions.
* **Handoff package:**
  Another developer should know that the Resources navigation problem was caused by a mismatch between the anchor target and the section id. The fix has been merged into <code>main</code>. The README was also corrected so that it now names index.html. A fresh-copy test should be repeated after any future setup or file-structure change.
  * *Commitments before next Day 2:*
    - Alex: Review the README for any other setup assumptions that are not explicitly documented.
    - Jordan: Identify one additional project behavior that should be tested during the next review/integration cycle.