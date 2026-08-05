import { FU_SOUNDS, MODULE_ID} from "./constants.js";
import { brfbSocket } from "./socket.js";
import { playLocalSound } from "./helpers.js";
import { randomItem } from "./helpers.js";

export async function broadcastHallOfShame() {
	const data = await hallOfShameData();
	await brfbSocket.executeForEveryone("playGlobalSound", "hall-of-shame.mp3");
	await brfbSocket.executeForEveryone("showHallOfShame", data);
}

export async function localHallOfShame() {
	const data = await hallOfShameData();
	await showHallOfShame(data);
}

async function hallOfShameData() {
	const scores = game.settings.get(MODULE_ID, "playerScores");

	const farters = [];
	const haters = [];
	const victims = [];
	const crop_dusted = [];

	for (const [userId, stats] of Object.entries(scores)) {
		const user = game.users.get(userId);
		if (!user || user.isGM) { continue; }
		const name = user?.name ?? "Unknown Degenerate";
		farters.push({ name, value: stats.fart_count ?? 0 });
		haters.push({ name, value: stats.fu_count ?? 0 });
		victims.push({ name, value: stats.fu_victim_count ?? 0});
		crop_dusted.push({ name, value: stats.crop_dusted_count ?? 0});
	}

	farters.sort( (a, b) => b.value - a.value );
	haters.sort((a, b) => b.value - a.value );
	victims.sort((a, b) => b.value - a.value );
	crop_dusted.sort((a, b) => b.value - a.value );

    const commentary = randomItem([
      "The White Council is deeply concerned.",
      "History will judge you.",
      "The atmosphere deserves compensation.",
      "Several crimes have occurred.",
      "The numbers speak for themselves.",
      "Mouse is disappointed.",
      "Mab would like a word.",
      "This is now part of the public record."
    ])

	return { 
		farters, 
		haters, 
		victims, 
		crop_dusted,
		commentary
	}

	return data;
}

export async function showHallOfShame(data) {
	const existing = document.querySelector( "#brfb-hall-of-shame" );
	if (existing) { existing.remove(); }
	//await playLocalSound("hall-of-shame.mp3");
	const overlay = document.createElement("div");
	overlay.id = "brfb-hall-of-shame";
	overlay.innerHTML = `
		<div class="brfb-hos-frame">
			<div class="brfb-hos-title">
				🏆 HALL OF SHAME 🏆
			</div>
			<div class="brfb-hos-grid">
				<div class="brfb-hos-section">
					<div class="brfb-hos-header">
						💨 Greatest Flatulence
					</div>
				${makeRows(data.farters)}
				</div>
			<div class="brfb-hos-section">
				<div class="brfb-hos-header">
					🦨 Most Crop Dusted
				</div>
				${makeRows(data.crop_dusted)}
			</div>
			<div class="brfb-hos-section">
				<div class="brfb-hos-header">
					🖕 Professional Haters
				</div>
				${makeRows(data.haters)}
			</div>
			<div class="brfb-hos-section">
				<div class="brfb-hos-header">
					😡 Most Victimized
				</div>
				${makeRows(data.victims)}
			</div>
			</div>
		<div class="brfb-hos-footer">
			${data.commentary}
		</div>
	</div>
	`;

	document.body.appendChild(overlay);

	overlay.addEventListener("click", () => {
		overlay.classList.add("brfb-hos-hide");
			setTimeout(() => { overlay.remove(); }, 500);
		}
	);
}

function makeRows(entries) {

  return entries
    .map((entry, index) => `

      <div class="brfb-hos-row">

        <span class="brfb-hos-name">
          ${index + 1}. ${entry.name}
        </span>

        <span class="brfb-hos-value">
          ${entry.value}
        </span>

      </div>

    `)
    .join("");
}