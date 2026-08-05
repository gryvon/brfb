import { FU_SOUNDS, MODULE_ID} from "./constants.js";
import { brfbSocket } from "./socket.js";
import { incrementPlayerCount } from "./counters.js";
import { randomItem, getTokenOwners } from "./helpers.js";

async function fireMiddleFinger(source, target) {
	await new Sequence()
	// Projectile Finger
	.effect()
	.file(`modules/${MODULE_ID}/assets/middle-finger.png`)
	.atLocation(source)
	.moveTowards(target)
	.scaleToObject(0.75)
	.scaleIn(0.01, 200)
	.scaleOut(1, 200)
	.animateProperty(
		"spriteContainer",
		"rotation",
		{
			from: 0,
			to: 1800,
			duration: 1200
		}
	)
	.duration(1200)
	.waitUntilFinished()

	// Pulsing Figer
	.effect()
	.file(`modules/${MODULE_ID}/assets/middle-finger.png`)
	.atLocation(target)
	.scaleToObject(0.75)
	.loopProperty(
		"sprite",
		"scale.x",
		{
			values: [1, 1.4, 1, 1.4, 1],
			duration: 1000
		}
	)
	.loopProperty(
		"sprite",
		"scale.y",
		{
			values: [1, 1.4, 1, 1.4, 1],
			duration: 1000
		}
	)
	.duration(3600)
	.play();
}

export async function playFU(selectedTokenId, targetTokenIds) {
	const sourceToken = canvas.tokens.get(selectedTokenId);
	if (!sourceToken) { return; }

	for (const targetTokenId of targetTokenIds) {
		const targetToken = canvas.tokens.get(targetTokenId);
		if (!targetToken) { continue; }
		await fireMiddleFinger(sourceToken, targetToken);
	}
}

export async function requestFU(selectedTokenId, targetTokenIds) {
	// Play FU Sound only once regardless of number of targets.
	const sound = randomItem(FU_SOUNDS);
	await brfbSocket.executeForEveryone("playGlobalSound", sound);
	await brfbSocket.executeForEveryone("playFU", selectedTokenId, targetTokenIds)

	const players = getTokenOwners(selectedTokenId);
	for (const player of players) {
		await incrementPlayerCount(player.id, "fu_count")
	}

	for (const tokenId of targetTokenIds) {
		const users = getTokenOwners(tokenId);
		for (const user of users) {
			await incrementPlayerCount(user.id, "fu_victim_count");
		}
	}
}