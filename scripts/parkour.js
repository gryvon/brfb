import { MODULE_ID } from "./constants.js";
import { brfbSocket } from "./socket.js";
import { wait } from "./helpers.js";

function getRandomParkourDestination(token) {

  const gridSize = canvas.dimensions.size;

  for (let i = 0; i < 20; i++) {

const distance =
  Math.floor(Math.random() * 6) + 5; // 5-10

const angle =
  Math.random() * Math.PI * 2;

const dx =
  Math.round(
    Math.cos(angle) * distance
  );

const dy =
  Math.round(
    Math.sin(angle) * distance
  );

    if (distance < 5 || distance > 10) continue;

    const x = token.document.x + dx * gridSize;

    const y = token.document.y + dy * gridSize;

    const collision = CONFIG.Canvas.polygonBackends.move.testCollision(
        { x: token.center.x, y: token.center.y },
        	{
	          x: x + token.w / 2,
    	      y: y + token.h / 2
        	},
        	{
          		type: "move"
        	}
    );

    if (!collision.length) {
      return { x, y };
    }
  }

  return null;
}

export async function requestParkour(tokenId) {

  ui.notifications.info("Click a destination.");

  const token = canvas.tokens.get(tokenId);

  if (!token) return;

  canvas.stage.once("pointerdown",
    async event => {
    	const pos = event.data.getLocalPosition(canvas.stage);
    	const gridSize = canvas.dimensions.size;
    	const x = Math.round(pos.x / gridSize) * gridSize;
    	const y = Math.round(pos.y / gridSize) * gridSize;
//		const snapped = canvas.grid.getSnappedPoint(pos);

//		const destination = { x: snapped.x, y: snapped.y };

		const destination = canvas.grid.getSnappedPoint(pos, { mode: 512 });

    	//const collision = CONFIG.Canvas.polygonBackends.move.testCollision({ x: token.center.x, y: token.center.y }, { x: x + token.w / 2, y: y + token.h / 2 }, { type: "move" });
    	const collision = CONFIG.Canvas.polygonBackends.move.testCollision({ x: token.center.x, y: token.center.y }, { x: destination.x, y: destination.y }, { type: "move" });
    	if (collision.length) {
        	ui.notifications.warn("No Can Do. There's a Wall.");
        	return;
    	}
    	await brfbSocket.executeAsGM("playParkour", tokenId, { x: destination.x, y: destination.y });
    }
  );
}

export async function parkour(tokenId) {
	await brfbSocket.executeAsGM("playParkour", tokenId);
}

export async function playParkour(tokenId, destination) {
	const token = canvas.tokens.get(tokenId);
	if (!token) return;
	await brfbSocket.executeForEveryone("floatingTextOnToken", tokenId, "🏃 PARKOUR!", 3000, "#00ff00", true);
	await brfbSocket.executeForEveryone("playGlobalSound", "parkour.mp3");
	await token.document.update(destination, {animate: true});
	await token.document.update(destination, {animate: true});
}